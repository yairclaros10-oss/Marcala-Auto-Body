export const BUSINESS = {
  name: "Marcala Auto Body",
  tagline: "Quality Auto Body Repair You Can Trust.",
  phoneDisplay: "(704) 840-0725",
  phoneTel: "tel:+17048400725",
  address: "6401 N Tryon St Suite B, Charlotte, NC 28213",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Marcala+Auto+Body,+6401+N+Tryon+St+Suite+B,+Charlotte,+NC+28213",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Marcala+Auto+Body,+6401+N+Tryon+St+Suite+B,+Charlotte,+NC+28213&output=embed",
  reviewsUrl: "https://reviews.birdeye.com/marcala-auto-body-167591823361205",
  rating: "4.2",
  reviewCount: 18,
};

export const HOURS = [
  { days: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
  { days: "Saturday", time: "9:00 AM – 4:00 PM" },
  { days: "Sunday", time: "Closed" },
];

// Open/closed in shop local time (America/New_York): Mon-Fri 9-18, Sat 9-16, Sun closed.
export function isOpenNow(): boolean {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  const day = now.getDay();
  if (day === 0) return false;
  const mins = now.getHours() * 60 + now.getMinutes();
  const close = day === 6 ? 16 * 60 : 18 * 60;
  return mins >= 9 * 60 && mins < close;
}

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Our Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "Request an Estimate", href: "#estimate" },
  { label: "Contact", href: "#contact" },
];
