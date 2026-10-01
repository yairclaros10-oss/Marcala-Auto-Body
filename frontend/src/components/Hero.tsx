import { ClipboardList, MapPin, Phone, ShieldCheck, Star, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/site";
import { useLang } from "@/lib/i18n";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1618312980096-873bd19759a0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxhdXRvJTIwYm9keSUyMHNob3AlMjBjYXIlMjByZXBhaXJ8ZW58MHx8fHwxNzkwNjA1NzQ0fDA&ixlib=rb-4.1.0&q=85";

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="home" className="relative overflow-hidden pt-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 75% 30%, rgba(220,38,38,0.18) 0%, rgba(11,13,17,0) 70%)",
        }}
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <div className="rise-in rise-in-1 inline-flex items-center gap-2 rounded-full border border-[#DC2626]/40 bg-[#DC2626]/10 px-4 py-1.5">
            <MapPin className="h-3.5 w-3.5 text-[#F87171]" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FCA5A5]">
              {t.hero.badge}
            </span>
          </div>
          <h1
            data-testid="hero-heading"
            className="rise-in rise-in-2 font-heading mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {t.hero.h1a} <span className="text-[#DC2626]">{t.hero.h1b}</span>
          </h1>
          <p className="rise-in rise-in-3 mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {t.hero.description}
          </p>
          <div className="rise-in rise-in-4 mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#estimate"
              data-testid="hero-cta-estimate"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#DC2626] px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_28px_rgba(220,38,38,0.35)] transition-all hover:bg-[#B91C1C] hover:shadow-[0_0_36px_rgba(220,38,38,0.5)]"
            >
              <ClipboardList className="h-5 w-5" />
              {t.hero.ctaEstimate}
            </a>
            <a
              href={BUSINESS.phoneTel}
              data-testid="hero-cta-call"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-[#DC2626]/60 hover:bg-white/5"
            >
              <Phone className="h-5 w-5 text-[#DC2626]" />
              {t.hero.ctaCall}
            </a>
          </div>
          <div className="rise-in rise-in-4 mt-10 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 shrink-0 fill-[#DC2626] text-[#DC2626]" />
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-white">
                  {BUSINESS.rating} {t.hero.stat1a}
                </span>
                <br />
                {BUSINESS.reviewCount} {t.hero.stat1b}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#DC2626]" />
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-white">{t.hero.stat2a}</span>
                <br />
                {t.hero.stat2b}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 shrink-0 text-[#DC2626]" />
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-white">{t.hero.stat3a}</span>
                <br />
                {t.hero.stat3b}
              </p>
            </div>
          </div>
        </div>

        <div className="rise-in rise-in-2 relative">
          <div className="absolute -inset-3 rounded-2xl bg-[#DC2626]/15 blur-2xl" />
          <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            <img
              src={HERO_IMAGE}
              alt={t.hero.imageAlt}
              className="aspect-[4/3] w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11]/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-md border border-white/10 bg-[#0B0D11]/80 px-4 py-3 backdrop-blur-md">
              <p className="text-sm font-semibold text-white">{t.hero.imageCaption}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-[#F87171]">{t.hero.imageTag}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
