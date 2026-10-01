import asyncio
import ipaddress
import logging
import os
import re
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from typing import List, Optional
from urllib.parse import urlparse

import httpx
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import Response
from pydantic import BaseModel, Field
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
from lib.db import client, db, ensure_indexes

# Object storage (Emergent integration proxy)
STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
APP_NAME = "marcala-auto-body"
ALLOWED_PHOTO_TYPES = {"image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"}
MAX_PHOTOS = 5
MAX_PHOTO_BYTES = 10 * 1024 * 1024

# Estimate notifications
APP_BASE_URL = (os.environ.get("APP_URL") or "").rstrip("/")
NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL")
NOTIFY_PHONE = os.environ.get("NOTIFY_PHONE")

# Managed email (platform proxy — base URL is a constant on purpose)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Marcala Auto Body")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")

SHOP_PHONE_1 = "(704) 840-0725"
SHOP_PHONE_2 = "(516) 234-8027"
SHOP_ADDRESS = "2601 S Tryon St, Charlotte, NC 28203"

DAMAGE_LABELS = {
    "en": {
        "collision": "Collision damage",
        "dent": "Dent / ding",
        "bumper": "Bumper damage",
        "fender": "Fender damage",
        "scratches": "Scratches / paint damage",
        "repaint": "Full repaint / color change",
        "other": "Other / not sure",
    },
    "es": {
        "collision": "Daño por colisión",
        "dent": "Abolladura / golpe",
        "bumper": "Daño en defensa",
        "fender": "Daño en salpicadera",
        "scratches": "Rayones / daño de pintura",
        "repaint": "Repintado completo / cambio de color",
        "other": "Otro / no estoy seguro",
    },
}

storage_key: Optional[str] = None


def init_storage(force: bool = False) -> str:
    global storage_key
    if storage_key and not force:
        return storage_key
    resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
    resp.raise_for_status()
    storage_key = resp.json()["storage_key"]
    return storage_key


def put_object(path: str, data: bytes, content_type: str) -> dict:
    resp = requests.put(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": init_storage(), "Content-Type": content_type},
        data=data,
        timeout=120,
    )
    resp.raise_for_status()
    return resp.json()


def get_object(path: str) -> tuple[bytes, str]:
    resp = requests.get(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": init_storage()},
        timeout=60,
    )
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")


# --- Email guardrail gate (G2/G3 structural checks; called on every send) ---
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    async with httpx.AsyncClient(timeout=30) as http:
        resp = await http.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY or ""},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


def _estimate_email(estimate: "Estimate") -> tuple[str, str]:
    vehicle = escape(f"{estimate.vehicle_year} {estimate.vehicle_make} {estimate.vehicle_model}")
    subject = f"New Estimate Request — {estimate.vehicle_year} {estimate.vehicle_make} {estimate.vehicle_model}"
    rows = [
        ("Name", escape(estimate.name)),
        ("Phone", f'<a href="tel:{escape(estimate.phone)}" style="color:#DC2626">{escape(estimate.phone)}</a>'),
        ("Email", f'<a href="mailto:{escape(estimate.email)}" style="color:#DC2626">{escape(estimate.email)}</a>'),
        ("Vehicle", vehicle),
        ("Damage type", escape(estimate.damage_type or "Not specified")),
        ("Description", escape(estimate.description).replace("\n", "<br>")),
        ("Reference", escape(estimate.id)),
    ]
    body_rows = "".join(
        f'<tr><td style="padding:8px 16px 8px 0;color:#64748B;font-size:13px;vertical-align:top;white-space:nowrap">{label}</td>'
        f'<td style="padding:8px 0;color:#0F172A;font-size:14px">{value}</td></tr>'
        for label, value in rows
    )
    photo_links = ""
    if estimate.photos and APP_BASE_URL:
        cells = "".join(
            f'<a href="{APP_BASE_URL}{escape(p.url)}"><img src="{APP_BASE_URL}{escape(p.url)}" '
            f'alt="Vehicle photo {i + 1}" width="160" style="width:160px;height:auto;border-radius:6px;'
            f'border:1px solid #E2E8F0;margin:4px 8px 4px 0;display:inline-block"></a>'
            for i, p in enumerate(estimate.photos)
        )
        photo_links = (
            f'<tr><td style="padding:8px 16px 8px 0;color:#64748B;font-size:13px;vertical-align:top">Photos</td>'
            f'<td style="padding:8px 0">{cells}</td></tr>'
        )
    html = (
        '<table role="presentation" width="100%" style="background:#F8FAFC;padding:24px 0"><tr><td align="center">'
        '<table role="presentation" width="560" style="background:#FFFFFF;border:1px solid #E2E8F0;'
        'border-top:4px solid #DC2626;padding:28px;font-family:Arial,sans-serif">'
        f'<tr><td><p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;color:#DC2626;font-weight:bold">MARCALA AUTO BODY</p>'
        f'<h1 style="margin:0 0 16px;font-size:20px;color:#0F172A">New Estimate Request</h1>'
        f'<table role="presentation">{body_rows}{photo_links}</table>'
        f'<p style="margin:20px 0 0;font-size:11px;color:#94A3B8">Sent by the {escape(EMAIL_FROM_NAME)} website '
        'estimate form. Reply to this email to reach the customer directly.</p>'
        '</td></tr></table></td></tr></table>'
    )
    return subject, html


def _customer_email(estimate: "Estimate") -> tuple[str, str]:
    es = estimate.lang == "es"
    name = escape(estimate.name.split(" ")[0] or estimate.name)
    vehicle = escape(f"{estimate.vehicle_year} {estimate.vehicle_make} {estimate.vehicle_model}")
    labels = DAMAGE_LABELS["es" if es else "en"]
    damage = escape(labels.get(estimate.damage_type or "", estimate.damage_type or ("No especificado" if es else "Not specified")))
    phone_links = (
        f'<a href="tel:+17048400725" style="color:#DC2626;font-weight:bold">{SHOP_PHONE_1}</a>'
        f' &nbsp;·&nbsp; <a href="tel:+15162348027" style="color:#DC2626;font-weight:bold">{SHOP_PHONE_2}</a>'
    )
    if es:
        subject = "Recibimos su solicitud de presupuesto — Marcala Auto Body"
        heading = f"¡Gracias, {name}!"
        intro = (
            f"Hemos recibido su solicitud de presupuesto para su <strong>{vehicle}</strong>. "
            "Nuestro equipo revisa las solicitudes durante el horario de atención "
            "(lunes a viernes de 9 AM a 6 PM, sábado de 9 AM a 4 PM) y nos comunicaremos con usted pronto."
        )
        row_labels = ("Vehículo", "Tipo de daño", "Referencia")
        faster = "¿Lo necesita más rápido? Llámenos o visítenos:"
        footer = (
            "Marcala Auto Body — 2601 S Tryon St, Charlotte, NC 28203. "
            "Recibió este correo porque solicitó un presupuesto en nuestro sitio web."
        )
    else:
        subject = "We received your estimate request — Marcala Auto Body"
        heading = f"Thank you, {name}!"
        intro = (
            f"We've received your estimate request for your <strong>{vehicle}</strong>. "
            "Our team reviews requests during business hours "
            "(Mon–Fri 9 AM–6 PM, Sat 9 AM–4 PM) and will reach out to you shortly."
        )
        row_labels = ("Vehicle", "Damage type", "Reference")
        faster = "Need it faster? Call or stop by:"
        footer = (
            "Marcala Auto Body — 2601 S Tryon St, Charlotte, NC 28203. "
            "You received this email because you requested an estimate on our website."
        )
    rows = "".join(
        f'<tr><td style="padding:8px 16px 8px 0;color:#64748B;font-size:13px;vertical-align:top;white-space:nowrap">{label}</td>'
        f'<td style="padding:8px 0;color:#0F172A;font-size:14px">{value}</td></tr>'
        for label, value in zip(row_labels, (vehicle, damage, escape(estimate.id[:8].upper())))
    )
    html = (
        '<table role="presentation" width="100%" style="background:#F8FAFC;padding:24px 0"><tr><td align="center">'
        '<table role="presentation" width="560" style="background:#FFFFFF;border:1px solid #E2E8F0;'
        'border-top:4px solid #DC2626;padding:28px;font-family:Arial,sans-serif">'
        f'<tr><td><p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;color:#DC2626;font-weight:bold">MARCALA AUTO BODY</p>'
        f'<h1 style="margin:0 0 12px;font-size:20px;color:#0F172A">{heading}</h1>'
        f'<p style="margin:0 0 16px;font-size:14px;color:#334155;line-height:1.6">{intro}</p>'
        f'<table role="presentation">{rows}</table>'
        f'<p style="margin:20px 0 0;font-size:14px;color:#334155">{faster}<br>{phone_links}</p>'
        f'<p style="margin:20px 0 0;font-size:11px;color:#94A3B8">{footer}</p>'
        '</td></tr></table></td></tr></table>'
    )
    return subject, html


def _estimate_sms_body(estimate: "Estimate") -> str:
    damage = estimate.damage_type or "damage"
    return (
        f"Marcala Auto Body — new estimate: {estimate.name}, {estimate.phone}. "
        f"{estimate.vehicle_year} {estimate.vehicle_make} {estimate.vehicle_model} ({damage}). "
        f"Full details + photos emailed to {NOTIFY_EMAIL}. Ref {estimate.id[:8].upper()}"
    )[:480]


def _send_estimate_sms(estimate: "Estimate") -> None:
    from twilio.rest import Client

    twilio = Client(os.environ["TWILIO_ACCOUNT_SID"], os.environ["TWILIO_AUTH_TOKEN"])
    extra = {}
    if estimate.photos and APP_BASE_URL:
        # MMS: attach the vehicle photos (Twilio accepts up to 10 media URLs)
        extra["media_url"] = [f"{APP_BASE_URL}{p.url}" for p in estimate.photos[:10]]
    twilio.messages.create(
        to=NOTIFY_PHONE,
        from_=os.environ["TWILIO_FROM_NUMBER"],
        body=_estimate_sms_body(estimate),
        **extra,
    )


async def notify_new_estimate(estimate: "Estimate") -> None:
    tasks = []
    if EMAIL_KEY and NOTIFY_EMAIL:
        subject, html = _estimate_email(estimate)
        tasks.append(send_email(to=NOTIFY_EMAIL, subject=subject, html=html))
    else:
        logger.warning("Owner email notification skipped: EMERGENT_EMAIL_KEY or NOTIFY_EMAIL missing")
    if EMAIL_KEY:
        subject, html = _customer_email(estimate)
        tasks.append(send_email(to=estimate.email, subject=subject, html=html))
    if NOTIFY_PHONE and all(os.environ.get(k) for k in ("TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_FROM_NUMBER")):
        tasks.append(asyncio.to_thread(_send_estimate_sms, estimate))
    else:
        logger.info("SMS notification skipped: Twilio credentials not configured yet")
    if tasks:
        results = await asyncio.gather(*tasks, return_exceptions=True)
        for r in results:
            if isinstance(r, Exception):
                logger.error(f"Estimate notification failed: {r}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.index_task = asyncio.create_task(ensure_indexes())
    try:
        await asyncio.to_thread(init_storage)
        logger.info("Object storage initialized")
    except Exception as e:
        logger.error(f"Storage init failed: {e}")
    yield
    client.close()


app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class EstimatePhoto(BaseModel):
    path: str
    original_filename: str
    content_type: str
    size: int
    url: str


class Estimate(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: str
    vehicle_year: str
    vehicle_make: str
    vehicle_model: str
    damage_type: Optional[str] = None
    description: str
    lang: str = "en"
    photos: List[EstimatePhoto] = Field(default_factory=list)
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


@api_router.get("/")
async def root():
    return {"message": "Marcala Auto Body API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    _ = await db.status_checks.insert_one(status_obj.model_dump())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**s) for s in status_checks]


@api_router.post("/estimates", response_model=Estimate, status_code=201)
async def create_estimate(
    name: str = Form(...),
    phone: str = Form(...),
    email: str = Form(...),
    vehicle_year: str = Form(...),
    vehicle_make: str = Form(...),
    vehicle_model: str = Form(...),
    damage_type: Optional[str] = Form(None),
    description: str = Form(...),
    lang: str = Form("en"),
    photos: List[UploadFile] = File(default=[]),
):
    photos = [p for p in photos if p.filename]
    if len(photos) > MAX_PHOTOS:
        raise HTTPException(status_code=400, detail=f"You can upload up to {MAX_PHOTOS} photos.")

    saved: List[EstimatePhoto] = []
    for photo in photos:
        content_type = photo.content_type or "application/octet-stream"
        if content_type not in ALLOWED_PHOTO_TYPES:
            raise HTTPException(status_code=400, detail=f"Unsupported file type: {content_type}. Please upload JPG, PNG or WebP images.")
        data = await photo.read()
        if not data:
            continue
        if len(data) > MAX_PHOTO_BYTES:
            raise HTTPException(status_code=400, detail=f"'{photo.filename}' is larger than 10 MB.")
        ext = photo.filename.rsplit(".", 1)[-1].lower() if "." in photo.filename else "jpg"
        path = f"{APP_NAME}/uploads/estimates/{uuid.uuid4()}.{ext}"
        try:
            result = await asyncio.to_thread(put_object, path, data, content_type)
        except Exception:
            logger.exception("Photo upload to object storage failed")
            raise HTTPException(status_code=502, detail="Photo upload failed. Please try again, or call the shop and describe the damage.")
        saved.append(EstimatePhoto(
            path=result["path"],
            original_filename=photo.filename,
            content_type=content_type,
            size=result.get("size", len(data)),
            url=f"/api/files/{result['path']}",
        ))

    estimate = Estimate(
        name=name.strip(),
        phone=phone.strip(),
        email=email.strip(),
        vehicle_year=vehicle_year.strip(),
        vehicle_make=vehicle_make.strip(),
        vehicle_model=vehicle_model.strip(),
        damage_type=damage_type,
        description=description.strip(),
        lang="es" if lang == "es" else "en",
        photos=saved,
    )
    await db.estimates.insert_one(estimate.model_dump())
    # Fire-and-forget: notification failures must never fail the customer's submission.
    asyncio.create_task(notify_new_estimate(estimate))
    return estimate


@api_router.get("/estimates", response_model=List[Estimate])
async def list_estimates():
    docs = await db.estimates.find().sort("created_at", -1).to_list(500)
    return [Estimate(**doc) for doc in docs]


@api_router.get("/files/{path:path}")
async def serve_file(path: str):
    try:
        data, content_type = await asyncio.to_thread(get_object, path)
    except requests.HTTPError:
        raise HTTPException(status_code=404, detail="File not found")
    return Response(content=data, media_type=content_type)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
