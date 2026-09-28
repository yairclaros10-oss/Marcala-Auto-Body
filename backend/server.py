import asyncio
import logging
import os
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional

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
        photos=saved,
    )
    await db.estimates.insert_one(estimate.model_dump())
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
