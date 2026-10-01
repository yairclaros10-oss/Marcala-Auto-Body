import type { ComponentType } from "react";
import { ArrowUpRight, Facebook, Instagram } from "lucide-react";
import Reveal from "@/components/Reveal";
import { SOCIAL_LINKS } from "@/lib/site";
import { useLang } from "@/lib/i18n";

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const PLATFORMS: {
  key: keyof typeof SOCIAL_LINKS;
  label: string;
  handle: string;
  icon: ComponentType<{ className?: string }>;
  testid: string;
}[] = [
  { key: "facebook", label: "Facebook", handle: "Marcala Auto Body", icon: Facebook, testid: "social-facebook" },
  { key: "instagram", label: "Instagram", handle: "@marcalaauto_", icon: Instagram, testid: "social-instagram" },
  { key: "tiktok", label: "TikTok", handle: "@marcala.auto.body", icon: TikTokIcon, testid: "social-tiktok" },
];

export default function Social() {
  const { t } = useLang();

  return (
    <section id="social" className="border-t border-white/5 bg-[#0E1117] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F87171]">
            {t.social.kicker}
          </p>
          <h2 className="font-heading mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {t.social.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">{t.social.sub}</p>
        </Reveal>

        <div data-testid="social-links" className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
          {PLATFORMS.map((platform, i) => (
            <Reveal key={platform.key} delay={i * 0.08}>
              <a
                href={SOCIAL_LINKS[platform.key]}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={platform.testid}
                className="group flex h-full flex-col items-center rounded-xl border border-white/10 bg-[#12161E] px-6 py-8 text-center transition-colors duration-300 hover:border-[#DC2626]/60 hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#DC2626]/12 text-[#F87171] transition-colors group-hover:bg-[#DC2626] group-hover:text-white">
                  <platform.icon className="h-6 w-6" />
                </span>
                <p className="font-heading mt-4 text-lg font-semibold text-white">{platform.label}</p>
                <p className="mt-1 text-sm text-slate-400">{platform.handle}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F87171] transition-colors group-hover:text-white">
                  {t.social.follow}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
