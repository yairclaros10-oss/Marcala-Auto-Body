import { useState } from "react";
import { Info } from "lucide-react";
import { useLang } from "@/lib/i18n";

type FilterKey = "all" | "collision" | "paint" | "dents" | "bumpers";

const FILTERS: { key: FilterKey; testid: string }[] = [
  { key: "all", testid: "gallery-filter-all" },
  { key: "collision", testid: "gallery-filter-collision" },
  { key: "paint", testid: "gallery-filter-paint" },
  { key: "dents", testid: "gallery-filter-dents" },
  { key: "bumpers", testid: "gallery-filter-bumpers" },
];

const WORK_IMAGES = [
  "https://images.unsplash.com/photo-1666009419871-c8bee023574e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxjYXIlMjBzcHJheSUyMHBhaW50JTIwYm9vdGglMjBhdXRvbW90aXZlJTIwcGFpbnRpbmd8ZW58MHx8fHwxNzkwNjA1NzQ0fDA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1666009387246-65e8ad8e7103?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxjYXIlMjBzcHJheSUyMHBhaW50JTIwYm9vdGglMjBhdXRvbW90aXZlJTIwcGFpbnRpbmd8ZW58MHx8fHwxNzkwNjA1NzQ0fDA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1702146713858-8e7d1cc29fe8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxhdXRvJTIwYm9keSUyMHNob3AlMjBjYXIlMjByZXBhaXJ8ZW58MHx8fHwxNzkwNjA1NzQ0fDA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1610092708835-af669294f3f3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw0fHxhdXRvJTIwYm9keSUyMHNob3AlMjBjYXIlMjByZXBhaXJ8ZW58MHx8fHwxNzkwNjA1NzQ0fDA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1733928907064-6a92c9ce0e87?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxkYW1hZ2VkJTIwY2FyJTIwZGVudCUyMHNjcmF0Y2glMjBjbG9zZXVwfGVufDB8fHx8MTc5MDYwNTc4OHww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1620584898989-d39f7f9ed1b7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwyfHxwb2xpc2hlZCUyMGx1eHVyeSUyMGNhciUyMHBhaW50JTIwZGV0YWlsJTIwc2hpbmV8ZW58MHx8fHwxNzkwNjA1Nzg4fDA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1692119439873-7a4be83beeea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxkYW1hZ2VkJTIwY2FyJTIwZGVudCUyMHNjcmF0Y2glMjBjbG9zZXVwfGVufDB8fHx8MTc5MDYwNTc4OHww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1708805282706-f44730b7e527?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHw0fHxwb2xpc2hlZCUyMGx1eHVyeSUyMGNhciUyMHBhaW50JTIwZGV0YWlsJTIwc2hpbmV8ZW58MHx8fHwxNzkwNjA1Nzg4fDA&ixlib=rb-4.1.0&q=85",
];

export default function Gallery() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const { t } = useLang();
  const items = t.gallery.items
    .map((item, i) => ({ ...item, image: WORK_IMAGES[i] }))
    .filter((w) => filter === "all" || w.category === filter);

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
            {FILTERS.map((f) => (
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

        <div className="mt-6 flex items-start gap-2 rounded-md border border-dashed border-[#DC2626]/40 bg-[#DC2626]/5 px-4 py-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#F87171]" />
          <p className="text-xs leading-relaxed text-slate-400">{t.gallery.note}</p>
        </div>

        <div data-testid="work-gallery-grid" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <figure
              key={item.title}
              className="group relative overflow-hidden rounded-lg border border-white/10"
            >
              <img
                src={item.image}
                alt={`${item.title}${t.gallery.altSuffix}`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11]/90 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 rounded-sm bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                {t.gallery.placeholderBadge}
              </span>
              <figcaption className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#F87171]">
                  {t.gallery.filters[item.category as FilterKey]}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">{item.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
