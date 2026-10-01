import type { LucideIcon } from "lucide-react";
import {
  Car,
  Cpu,
  FileCheck,
  Hammer,
  Layers,
  Paintbrush,
  Palette,
  ShieldAlert,
  Sparkles,
  Wrench,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/lib/i18n";

const SERVICE_META: { id: string; icon: LucideIcon }[] = [
  { id: "collision-repair", icon: ShieldAlert },
  { id: "auto-body-repair", icon: Wrench },
  { id: "dent-repair", icon: Hammer },
  { id: "bumper-repair", icon: Car },
  { id: "fender-repair", icon: Cpu },
  { id: "automotive-painting", icon: Paintbrush },
  { id: "paint-matching", icon: Sparkles },
  { id: "scratch-repair", icon: Layers },
  { id: "color-changes", icon: Palette },
  { id: "insurance-claim-assistance", icon: FileCheck },
];

export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="border-t border-white/5 bg-[#0B0D11] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F87171]">
            {t.services.kicker}
          </p>
          <h2 className="font-heading mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {t.services.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">{t.services.sub}</p>
        </Reveal>

        <div data-testid="services-grid" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_META.map((meta, i) => {
            const service = t.services.items[i];
            return (
              <Reveal key={meta.id} delay={(i % 3) * 0.08}>
                <article
                  data-testid={`service-card-${meta.id}`}
                  className="group h-full rounded-lg border border-white/10 bg-[#12161E] p-6 transition-colors duration-300 hover:border-[#DC2626]/50 hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#DC2626]/12 text-[#F87171] transition-colors group-hover:bg-[#DC2626]/25">
                      <meta.icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {service.badge}
                    </span>
                  </div>
                  <h3 className="font-heading mt-5 text-lg font-semibold text-white">{service.title}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#F87171]/80">
                    {service.category}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{service.description}</p>
                  <a
                    href="#estimate"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F87171] transition-colors hover:text-white"
                  >
                    {t.services.cta}
                    <span aria-hidden="true">→</span>
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
