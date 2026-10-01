# Marcala Auto Body — Website PRD

## Original Problem Statement
Professional, modern website for Marcala Auto Body, an auto body & collision repair shop in Charlotte, NC. Premium red/black/white/dark-gray automotive design, fast, clean, mobile-friendly. Homepage hero "Quality Auto Body Repair You Can Trust." with Request an Estimate + Call Now buttons; 10 service cards (collision, body, dent, bumper, fender, painting, paint matching, scratch, color changes, insurance claims); About section; Our Work gallery with before/after; estimate request form (name, phone, email, year, make, model, damage description, photo upload); Reviews section with placeholders (no invented reviews); Contact with verified phone/address/hours/map/Call Now; local SEO (titles, meta, headings, local business info); nav: Home | Services | About | Our Work | Reviews | Request an Estimate | Contact; responsive + subtle animations. No made-up business info — verified info or clearly marked placeholders. Sources: Birdeye profile + Facebook page.

## Verified Business Info (sources: Google Business Profile via user-provided link, Chamber of Commerce, Birdeye)
- Address: 2601 S Tryon St, Charlotte, NC 28203 (current Google listing; older directories list 6401 N Tryon St Suite B and 513 W 24th St — shop has moved; OWNER SHOULD CONFIRM current location)
- Phone: (704) 840-0725 (consistent across Google, Chamber, MapQuest); second line added by owner 2026-10-01: (516) 234-8027
- Email: collisionmarcalaauto@gmail.com (provided by owner 2026-09-29)
- Hours: Mon–Fri 9:00 AM–6:00 PM, Sat 9:00 AM–4:00 PM, Sun Closed
- Rating: 4.5 from 24 Google reviews (Google listing, Sep 2026)

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

## Implemented (2026-09-29)
- Added shop email collisionmarcalaauto@gmail.com to Contact section, Footer, and JSON-LD
- Replaced review placeholders with 4 real Google reviews (Elin Santos, Local Client, Beans Book of Rod Shops, Faizan Zeb) sourced via the Google listing the owner shared + Chamber of Commerce mirror; aggregate updated to 4.5/24 per current Google listing
- Updated address site-wide (Contact, Footer, About, map embed, directions, JSON-LD) to 2601 S Tryon St, Charlotte, NC 28203 per the current Google Business Profile
- Domain request answered: Emergent preview/deploy subdomains are not customizable; a custom domain (e.g. marcala-auto-body.com) can be connected after publishing via Manage Publishes → Domain tab (auto-link or buy through Emergent)

## Implemented (2026-10-01)
- Added full EN/ES language toggle (ES/EN button in navbar desktop + mobile, data-testid language-toggle / language-toggle-mobile); all UI copy translated via `src/lib/translations.ts` dictionary + `src/lib/i18n.tsx` LanguageProvider (real customer review quotes remain verbatim in English); verified toggle round-trip and Spanish estimate submission end-to-end
- Replaced placeholder branding with the owner's uploaded logo: transparent-background `public/logo.png` in header + footer, favicons (16/32/180) generated from the car artwork, og:image + twitter card meta updated
- Case 1 of the before/after slider now uses real shop photos (owner-uploaded Honda S2000 front-end rebuild: `public/work/case1-before.jpg` stripped front clip, `case1-after.jpg` finished) with "Real repair" note in EN/ES; cases 2–3 remain marked placeholders; fixed slow-decoding 12MP Unsplash images (added w=1600 params + keyed img elements)
- Case 2 also real: owner-uploaded black pickup full repaint & reassembly (`public/work/case2-before.jpg` wheels-off teardown, `case2-after.jpg` finished) — EN/ES copy rewritten to match; only Case 3 remains a marked placeholder
- Case 3 real too: owner-uploaded white Chevy Suburban full repaint (`public/work/case3-before.webp` masked in booth, `case3-after.webp` finished) — all 3 before/after cases now use genuine shop photos with EN/ES copy; section intro updated to say every case is a real vehicle
- Gallery: first real shop photo added (`public/work/gallery-quarter-panel.jpg` — technician doing quarter-panel body work on a red Mitsubishi SUV), shown as "Quarter Panel Body Work in Progress" under the Collision filter; real photos (local /work/ paths) render without the Placeholder badge, stock items keep it
- About section image replaced with real shop photo (`public/work/about-painting.webp` — technician spraying red paint, logo watermark), displayed at natural 8:3 banner ratio; placeholder caption removed
- Full-width shop banner added between the marquee and the Services ("What We Do") section: `public/work/banner-cap.webp` (Marcala cap on freshly painted red fender), 21:9 crop, both languages
- Hero stock photo removed per owner request (2026-10-01): hero is now a text-first single-column layout, keeping the masked line reveal, CTAs and trust stats; unused parallax code removed
- Social section added between Reviews and Estimate: Facebook (facebook.com/share/19yu1cYATQ/), Instagram (@marcalaauto_), TikTok (@marcala.auto.body) cards in EN/ES, plus matching icon row in the footer; links centralized in `SOCIAL_LINKS` in src/lib/site.ts
- Publish attempt: blocked by balance — first deploy costs 50 ECUs/month, user balance was 40 ECUs; user to top up via Profile → Manage plan, then re-dispatch deploy (no charge consent flag) and connect marcala-auto-body.com via Manage Publishes → Domain tab

## Implemented (2026-10-01, part 2)
- Estimate notifications: every submission emails full details + photo links to collisionmarcalaauto@gmail.com via the Emergent managed email integration (verified 202 Accepted on live submissions; guardrail gate `_assert_safe_email` on every send; reply-to set to the shop inbox). SMS to (704) 840-0725 is pre-wired via Twilio — activates automatically once TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM_NUMBER are filled in backend/.env (currently logs "skipped" until then)
- Motion upgrade: Lenis momentum scrolling with anchor offset handling, kinetic masked line-by-line hero reveal + image clip reveal + scroll parallax (motion/react), staggered scroll-reveals on services/gallery via Reveal component, slow editorial services marquee between hero and services
- Customer thank-you emails: the estimate form passes the visitor's UI language (en/es); on submission the customer gets a branded confirmation email in matching language (vehicle summary, reference number, shop phones/address/hours) alongside the owner notification. Verified 202-accepted for both languages; note the email proxy blocks obviously fake recipient domains (deliverability protection)
- Note: DB now holds several test estimates (Test Customer, Browser Test, Prueba Español, Notify Test, Local Test, P1/P2/P3, Thanks EN, Gracias ES, Cliente Español) — clear before launch

## Backlog
- P0: Owner confirms current address (Google listing shows 2601 S Tryon St; older directories show 6401 N Tryon St Suite B) — site currently uses 2601 S Tryon St; replace placeholder gallery/before-after imagery with real shop photos
- P1: Admin view/login for reviewing submitted estimates (GET /api/estimates is currently unauthenticated); email notification to collisionmarcalaauto@gmail.com on new estimate (Resend); delete test submissions from the DB before launch; connect custom domain after publishing
- P2: Auto-sync Google reviews (Places API), Spanish-language toggle (shop has Spanish-speaking customers — "Se Habla Español" on Facebook), blog/FAQ for SEO, sitemap.xml + robots.txt

## Next Tasks
1. Confirm phone + hours with owner, swap in real photos
2. Add notification on new estimate submission
3. Protect the estimates list behind admin auth
