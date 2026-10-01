import { BadgeCheck, HeartHandshake, MessageSquareText, Search } from "lucide-react";
import { BUSINESS } from "@/lib/site";
import { useLang } from "@/lib/i18n";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1708805282706-f44730b7e527?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHw0fHxwb2xpc2hlZCUyMGx1eHVyeSUyMGNhciUyMHBhaW50JTIwZGV0YWlsJTIwc2hpbmV8ZW58MHx8fHwxNzkwNjA1Nzg4fDA&ixlib=rb-4.1.0&q=85";

const PILLAR_ICONS = [BadgeCheck, Search, MessageSquareText, HeartHandshake];

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="border-t border-white/5 bg-[#0B0D11] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-3 rounded-2xl bg-[#DC2626]/10 blur-2xl" />
            <img
              src={ABOUT_IMAGE}
              alt={t.about.imageAlt}
              className="relative aspect-[4/3] w-full rounded-xl border border-white/10 object-cover"
              loading="lazy"
            />
            <p className="mt-3 text-center text-[11px] uppercase tracking-wider text-slate-500">
              {t.about.imageCaption}
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F87171]">
              {t.about.kicker}
            </p>
            <h2 className="font-heading mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {t.about.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300">{t.about.p1}</p>
            <p className="mt-4 text-base leading-relaxed text-slate-400">{t.about.p2}</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {t.about.pillars.map((p, i) => {
                const Icon = PILLAR_ICONS[i];
                return (
                  <div key={p.title} className="flex gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#DC2626]/12 text-[#F87171]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.about.steps.map((s, i) => (
            <div
              key={s.title}
              className="rounded-lg border border-white/10 bg-[#12161E] p-6 transition-colors hover:border-[#DC2626]/40"
            >
              <p className="font-heading text-2xl font-bold text-[#DC2626]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-heading mt-3 text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-xl border border-[#DC2626]/30 bg-gradient-to-r from-[#DC2626]/15 via-[#12161E] to-[#12161E] px-8 py-7 sm:flex-row">
          <p className="text-center text-base font-semibold text-white sm:text-left">
            {t.about.banner}
          </p>
          <div className="flex gap-3">
            <a
              href="#estimate"
              data-testid="about-cta-estimate"
              className="rounded-md bg-[#DC2626] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B91C1C]"
            >
              {t.about.bannerCta}
            </a>
            <a
              href={BUSINESS.phoneTel}
              className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
