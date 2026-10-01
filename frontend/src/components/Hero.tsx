import { motion } from "motion/react";
import { ClipboardList, MapPin, Phone, ShieldCheck, Star, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/site";
import { useLang } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="home" className="relative overflow-hidden pt-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(55% 45% at 20% 25%, rgba(220,38,38,0.16) 0%, rgba(11,13,17,0) 70%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-[#DC2626]/40 bg-[#DC2626]/10 px-4 py-1.5"
          >
            <MapPin className="h-3.5 w-3.5 text-[#F87171]" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FCA5A5]">
              {t.hero.badge}
            </span>
          </motion.div>
          <h1
            data-testid="hero-heading"
            className="font-heading mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              >
                {t.hero.h1a}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block text-[#DC2626]"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
              >
                {t.hero.h1b}
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            {t.hero.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#estimate"
              data-testid="hero-cta-estimate"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#DC2626] px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_28px_rgba(220,38,38,0.35)] transition-colors hover:bg-[#B91C1C] hover:shadow-[0_0_36px_rgba(220,38,38,0.5)]"
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-12 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
