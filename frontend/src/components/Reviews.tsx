import { ExternalLink, Quote, Star } from "lucide-react";
import { BUSINESS } from "@/lib/site";

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
                Read reviews on our public profile
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2">
            {[1, 2].map((n) => (
              <div
                key={n}
                data-testid={`review-placeholder-${n}`}
                className="flex flex-col justify-between rounded-xl border border-dashed border-white/20 bg-[#12161E]/60 p-6"
              >
                <div>
                  <Quote className="h-6 w-6 text-[#DC2626]/50" />
                  <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                    Review placeholder
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    This space is reserved for a real customer review. We do not publish made-up
                    testimonials — genuine feedback from Marcala Auto Body customers will appear
                    here once reviews are connected.
                  </p>
                </div>
                <p className="mt-6 text-xs font-medium text-slate-500">
                  — Real customer name & rating will display here
                </p>
              </div>
            ))}
            <div className="flex items-center justify-center rounded-xl border border-dashed border-white/20 bg-[#12161E]/60 p-6 text-center sm:col-span-2">
              <p className="max-w-md text-sm leading-relaxed text-slate-400">
                Had work done at Marcala Auto Body? Your honest review could be featured here.
                Call us at{" "}
                <a href={BUSINESS.phoneTel} className="font-semibold text-[#F87171] hover:text-white">
                  {BUSINESS.phoneDisplay}
                </a>{" "}
                or leave a review on Google.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
