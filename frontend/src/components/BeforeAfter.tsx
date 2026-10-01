import { useState } from "react";
import { BadgeCheck, ChevronsLeftRight, Info } from "lucide-react";
import { useLang } from "@/lib/i18n";

// real: separate genuine before/after shop photos; placeholder cases reuse one stock image with a
// grayscale "before" treatment until real photos are supplied.
const CASE_MEDIA = [
  { before: "/work/case1-before.jpg", after: "/work/case1-after.jpg", real: true },
  {
    before:
      "https://images.unsplash.com/photo-1703609438732-2fad53e62a4b?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80&auto=format&ixlib=rb-4.1.0",
    after:
      "https://images.unsplash.com/photo-1703609438732-2fad53e62a4b?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80&auto=format&ixlib=rb-4.1.0",
    real: false,
  },
  {
    before:
      "https://images.unsplash.com/photo-1733928907064-6a92c9ce0e87?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80&auto=format&ixlib=rb-4.1.0",
    after:
      "https://images.unsplash.com/photo-1733928907064-6a92c9ce0e87?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80&auto=format&ixlib=rb-4.1.0",
    real: false,
  },
];

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const { t } = useLang();
  const current = t.beforeAfter.cases[active];
  const media = CASE_MEDIA[active];

  return (
    <section id="before-after" className="border-t border-white/5 bg-[#0E1117] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F87171]">
              {t.beforeAfter.kicker}
            </p>
            <h2 className="font-heading mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {t.beforeAfter.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">{t.beforeAfter.sub}</p>
          </div>
          <div className="flex gap-2">
            {CASE_MEDIA.map((_, i) => (
              <button
                key={i}
                data-testid={`before-after-tab-case-${i + 1}`}
                onClick={() => {
                  setActive(i);
                  setPos(50);
                }}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                  i === active
                    ? "bg-[#DC2626] text-white"
                    : "border border-white/10 text-slate-300 hover:border-[#DC2626]/50"
                }`}
              >
                {t.beforeAfter.caseTab} {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div data-testid="before-after-container" className="mt-10 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="relative aspect-[16/10] select-none overflow-hidden rounded-xl border border-white/10">
              <img
                key={`after-${active}`}
                src={media.after}
                alt={`${current.title} — ${t.beforeAfter.afterAlt}`}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <img
                  key={`before-${active}`}
                  src={media.before}
                  alt={`${current.title} — ${t.beforeAfter.beforeAlt}`}
                  className={`absolute inset-0 h-full w-full object-cover ${
                    media.real ? "" : "grayscale contrast-125 brightness-[0.6]"
                  }`}
                  draggable={false}
                />
              </div>
              <span className="absolute left-3 top-3 rounded-sm bg-black/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                {media.real ? t.beforeAfter.beforeRealLabel : t.beforeAfter.beforeLabel}
              </span>
              <span className="absolute right-3 top-3 rounded-sm bg-[#DC2626] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                {media.real ? t.beforeAfter.afterRealLabel : t.beforeAfter.afterLabel}
              </span>
              <div
                className="pointer-events-none absolute inset-y-0"
                style={{ left: `${pos}%` }}
              >
                <div className="absolute inset-y-0 -ml-px w-0.5 bg-[#DC2626]" />
                <div className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#DC2626] shadow-lg">
                  <ChevronsLeftRight className="h-5 w-5 text-white" />
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                data-testid="before-after-slider"
                aria-label={t.beforeAfter.sliderAria}
                className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
              />
            </div>
            {media.real ? (
              <div className="mt-4 flex items-start gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-4 py-3">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <p className="text-xs leading-relaxed text-slate-300">{t.beforeAfter.realNote}</p>
              </div>
            ) : (
              <div className="mt-4 flex items-start gap-2 rounded-md border border-dashed border-[#DC2626]/40 bg-[#DC2626]/5 px-4 py-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#F87171]" />
                <p className="text-xs leading-relaxed text-slate-400">{t.beforeAfter.note}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5 lg:col-span-2">
            <div className="rounded-lg border border-white/10 bg-[#12161E] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F87171]">
                {current.service}
              </p>
              <h3 className="font-heading mt-2 text-xl font-semibold text-white">{current.title}</h3>
              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {t.beforeAfter.damageHeading}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{current.damage}</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#F87171]">
                    {t.beforeAfter.repairHeading}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{current.repair}</p>
                </div>
              </div>
            </div>
            <a
              href="#estimate"
              data-testid="before-after-cta"
              className="inline-flex items-center justify-center rounded-md bg-[#DC2626] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#B91C1C]"
            >
              {t.beforeAfter.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
