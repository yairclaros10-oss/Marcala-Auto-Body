import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ClipboardList, MapPin, Phone, ShieldCheck, Star, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/site";
import { useLang } from "@/lib/i18n";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1618312980096-873bd19759a0?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80&auto=format&ixlib=rb-4.1.0";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section id="home" ref={sectionRef} className="relative overflow-hidden pt-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 75% 30%, rgba(220,38,38,0.18) 0%, rgba(11,13,17,0) 70%)",
        }}
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        <div>
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
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
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
            className="mt-10 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3"
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

        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.4 }}
          animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-2xl bg-[#DC2626]/15 blur-2xl" />
          <motion.div
            style={{ y: imageY }}
            className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
