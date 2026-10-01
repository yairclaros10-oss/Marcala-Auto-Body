export const BUSINESS = {
  name: "Marcala Auto Body",
  tagline: "Quality Auto Body Repair You Can Trust.",
  phoneDisplay: "(704) 840-0725",
  phoneTel: "tel:+17048400725",
  phone2Display: "(516) 234-8027",
  phone2Tel: "tel:+15162348027",
  email: "collisionmarcalaauto@gmail.com",
  address: "2601 S Tryon St, Charlotte, NC 28203",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Marcala+Auto+Body,+2601+S+Tryon+St,+Charlotte,+NC+28203",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Marcala+Auto+Body,+2601+S+Tryon+St,+Charlotte,+NC+28203&output=embed",
  reviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Marcala+Auto+body+2601+S+Tryon+St+Charlotte+NC+28203",
  rating: "4.5",
  reviewCount: 24,
};

// Open/closed in shop local time (America/New_York): Mon-Fri 9-18, Sat 9-16, Sun closed.
export function isOpenNow(): boolean {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  const day = now.getDay();
  if (day === 0) return false;
  const mins = now.getHours() * 60 + now.getMinutes();
  const close = day === 6 ? 16 * 60 : 18 * 60;
  return mins >= 9 * 60 && mins < close;
}

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/share/19yu1cYATQ/",
  tiktok: "https://www.tiktok.com/@marcala.auto.body",
  instagram: "https://www.instagram.com/marcalaauto_/",
};

export const NAV_HREFS = ["#home", "#services", "#about", "#work", "#reviews", "#estimate", "#contact"];
