import { useState } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/lib/i18n";

type FilterKey = "all" | "collision" | "paint" | "dents" | "bumpers";

const FILTERS: { key: FilterKey; testid: string }[] = [
  { key: "all", testid: "gallery-filter-all" },
  { key: "collision", testid: "gallery-filter-collision" },
  { key: "paint", testid: "gallery-filter-paint" },
  { key: "dents", testid: "gallery-filter-dents" },
  { key: "bumpers", testid: "gallery-filter-bumpers" },
];

// Real shop photos only, aligned by index with t.gallery.items.
const WORK_IMAGES = [
  "/work/gallery-quarter-panel.jpg",
  "/work/gallery-booth-spray.webp",
  "/work/gallery-masking-prep.webp",
  "/work/gallery-red-finished.jpg",
  "/work/gallery-red-primer.jpg",
  "/work/gallery-maskoff.jpg",
  "/work/gallery-project-intake.jpg",
  "/work/gallery-masked-sedan.webp",
];

export default function Gallery() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const { t } = useLang();
  const allItems = t.gallery.items.map((item, i) => ({ ...item, image: WORK_IMAGES[i] }));
  const items = allItems.filter((w) => filter === "all" || w.category === filter);
  // Only offer filters that actually have photos.
  const visibleFilters = FILTERS.filter(
    (f) => f.key === "all" || allItems.some((w) => w.category === f.key)
  );

  return (
    <section id="work" className="border-t border-white/5 bg-[#0E1117] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F87171]">
              {t.gallery.kicker}
            </p>
            <h2 className="font-heading mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {t.gallery.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">{t.gallery.sub}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {visibleFilters.map((f) => (
              <button
                key={f.key}
                data-testid={f.testid}
                onClick={() => setFilter(f.key)}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === f.key
                    ? "bg-[#DC2626] text-white"
                    : "border border-white/10 text-slate-300 hover:border-[#DC2626]/50"
                }`}
              >
                {t.gallery.filters[f.key]}
              </button>
            ))}
          </div>
        </div>

        <div data-testid="work-gallery-grid" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 0.06}>
              <figure className="group relative overflow-hidden rounded-lg border border-white/10">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11]/90 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#F87171]">
                    {t.gallery.filters[item.category as FilterKey]}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{item.title}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
