import { ExternalLink, Quote, Star } from "lucide-react";
import { BUSINESS } from "@/lib/site";

interface Review {
  name: string;
  date: string;
  text: string;
  verifiedFiveStar?: boolean;
}

// Real customer reviews sourced from the shop's public Google profile.
const REVIEWS: Review[] = [
  {
    name: "Elin Santos",
    date: "April 2026",
    text: "I recently got my truck painted by this awesome company, who also fixed some dents on one of my doors. You can't even tell someone hit my car after they fixed it. I changed the entire color of my vehicle from white to black. It looks awesome, I love the way it turned out.",
  },
  {
    name: "Local Client",
    date: "December 2025",
    text: "They are the best in the city, top quality and outstanding service. I took my 2023 Tesla Model Y and it looks brand new. They did an amazing job. I highly recommend them.",
  },
  {
    name: "Beans Book of Rod Shops",
    date: "April 2025",
    text: "Took my 2012 Genesis sedan with rear fender damage here to be repaired. As Marco assessed the damage, I decided to have them paint it as well. He did a complete color change including door jambs and under the hood. The car was ready very fast and he did a great job both on the damage and the paint.",
    verifiedFiveStar: true,
  },
  {
    name: "Faizan Zeb",
    date: "January 2026",
    text: "They are the best in body shop.",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" data-testid="reviews-section" className="border-t border-white/5 bg-[#0B0D11] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F87171]">
              Customer Reviews
            </p>
            <h2 className="font-heading mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              What Charlotte Drivers Say
            </h2>
            <div className="mt-8 rounded-xl border border-white/10 bg-[#12161E] p-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < 4 ? "fill-[#DC2626] text-[#DC2626]" : "fill-[#DC2626]/40 text-[#DC2626]/40"}`}
                  />
                ))}
              </div>
              <p className="font-heading mt-3 text-3xl font-bold text-white">
                {BUSINESS.rating} <span className="text-base font-medium text-slate-400">/ 5</span>
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Based on {BUSINESS.reviewCount} Google reviews
              </p>
              <a
                href={BUSINESS.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="reviews-external-link"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F87171] transition-colors hover:text-white"
              >
                Read all reviews on Google
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            {REVIEWS.map((review, i) => (
              <article
                key={review.name}
                data-testid={`review-card-${i + 1}`}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#12161E] p-6 transition-colors hover:border-[#DC2626]/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Quote className="h-6 w-6 text-[#DC2626]/60" />
                    {review.verifiedFiveStar && (
                      <span className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} className="h-3.5 w-3.5 fill-[#DC2626] text-[#DC2626]" />
                        ))}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">“{review.text}”</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{review.name}</p>
                    <p className="text-xs text-slate-500">{review.date}</p>
                  </div>
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Google review
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
