# Marcala Auto Body — Website PRD

## Original Problem Statement
Professional, modern website for Marcala Auto Body, an auto body & collision repair shop in Charlotte, NC. Premium red/black/white/dark-gray automotive design, fast, clean, mobile-friendly. Homepage hero "Quality Auto Body Repair You Can Trust." with Request an Estimate + Call Now buttons; 10 service cards (collision, body, dent, bumper, fender, painting, paint matching, scratch, color changes, insurance claims); About section; Our Work gallery with before/after; estimate request form (name, phone, email, year, make, model, damage description, photo upload); Reviews section with placeholders (no invented reviews); Contact with verified phone/address/hours/map/Call Now; local SEO (titles, meta, headings, local business info); nav: Home | Services | About | Our Work | Reviews | Request an Estimate | Contact; responsive + subtle animations. No made-up business info — verified info or clearly marked placeholders. Sources: Birdeye profile + Facebook page.

## Verified Business Info (sources: Birdeye profile, MapQuest/local directories)
- Address: 6401 N Tryon St Suite B, Charlotte, NC 28213 (Birdeye + NC Secretary of State)
- Hours: Mon–Fri 9:00 AM–6:00 PM, Sat 9:00 AM–4:00 PM, Sun Closed (Birdeye)
- Rating: 4.2 from 18 Google reviews (Birdeye)
- Phone: (704) 840-0725 — found via MapQuest + localitybiz directories; OWNER SHOULD CONFIRM before launch
- Email: not verified — intentionally omitted from the site

## User Personas
- Local driver with collision/dent/scratch damage wanting a fast free estimate
- Insurance claimant who wants the shop to handle the claim
- Custom-work customer (color change, full repaint)
- Mobile user calling directly from search results

## Architecture
- FastAPI backend (`/api` prefix): `POST /api/estimates` (multipart form + up to 5 photos → Emergent object storage, record in MongoDB `estimates`), `GET /api/estimates`, `GET /api/files/{path}` (serves uploaded photos from object storage)
- MongoDB `estimates` collection; indexes on `id` (unique) and `created_at`
- React 19 + Vite + Tailwind v4 single-page site, sections as components under `src/components/`, business constants in `src/lib/site.ts`
- SEO: title/meta/keywords/OG + AutoBodyShop JSON-LD in `index.html`
- Design system: `/app/design_guidelines.json` — obsidian #0B0D11, carbon #12161E, crimson #DC2626; Space Grotesk headings + DM Sans body

## Implemented (2026-09-28)
- Full single-page site: Hero, Services (10 cards), Before/After interactive slider (3 sample cases, marked placeholders), About (4 pillars + 4-step process), Our Work gallery (filterable, marked placeholders), Reviews (real 4.2/18 aggregate + clearly-marked placeholder cards, zero invented testimonials), Estimate form with photo upload + previews, Contact (click-to-call, address, hours table, live Open/Closed badge in ET, Google map embed), Footer, mobile sticky Call/Get Estimate bar
- Working estimate pipeline: browser form → FastAPI → object storage (photos) + MongoDB (record); verified end-to-end through the public URL including a real photo upload and download
- Local SEO meta + JSON-LD structured data targeting "auto body shop Charlotte NC" etc.
- All interactive elements carry data-testids

## Backlog
- P0: Owner confirms phone number (704) 840-0725; replace placeholder gallery/before-after imagery with real shop photos; connect real Google reviews to the Reviews section
- P1: Admin view/login for reviewing submitted estimates (GET /api/estimates is currently unauthenticated); email/SMS notification to the shop on new estimate (Resend/Twilio); delete test submissions from the DB before launch
- P2: Real customer review sync (Google Places API), Spanish-language toggle (shop has Spanish-speaking customers), blog/FAQ for SEO, sitemap.xml + robots.txt, custom domain

## Next Tasks
1. Confirm phone + hours with owner, swap in real photos
2. Add notification on new estimate submission
3. Protect the estimates list behind admin auth
