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

interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  badge: string;
  icon: LucideIcon;
}

const SERVICES: Service[] = [
  {
    id: "collision-repair",
    title: "Collision Repair",
    category: "Structural & Safety",
    description:
      "Comprehensive structural realignment and body rebuilding after major or minor collisions, restored to factory specifications.",
    badge: "Core Specialty",
    icon: ShieldAlert,
  },
  {
    id: "auto-body-repair",
    title: "Auto Body Repair",
    category: "Body Work",
    description:
      "Full-spectrum metalwork, panel straightening, and seamless structural restoration for all makes and models.",
    badge: "Full Service",
    icon: Wrench,
  },
  {
    id: "dent-repair",
    title: "Dent Repair",
    category: "Precision Removal",
    description:
      "Paintless dent repair and conventional dent pulling to eliminate door dings, creases, and hail damage.",
    badge: "PDR Available",
    icon: Hammer,
  },
  {
    id: "bumper-repair",
    title: "Bumper Repair",
    category: "Front & Rear",
    description:
      "Plastic welding, crack repair, dent reshaping, and complete bumper replacement with color-matched refinishing.",
    badge: "Fast Turnaround",
    icon: Car,
  },
  {
    id: "fender-repair",
    title: "Fender Repair",
    category: "Panel Alignment",
    description:
      "Restoration and realignment of bent or crushed fenders, quarter panels, and wheel wells with tight seam gaps.",
    badge: "OEM Precision",
    icon: Cpu,
  },
  {
    id: "automotive-painting",
    title: "Automotive Painting",
    category: "Spray Booth Finish",
    description:
      "Professional spray booth finishes with premium multi-stage base and clear coats for a deep showroom gloss.",
    badge: "Full Refinish",
    icon: Paintbrush,
  },
  {
    id: "paint-matching",
    title: "Paint Matching",
    category: "Color Precision",
    description:
      "Computerized color matching for invisible panel blending and exact factory tones on every repair.",
    badge: "Exact Match",
    icon: Sparkles,
  },
  {
    id: "scratch-repair",
    title: "Scratch Repair",
    category: "Surface Refinishing",
    description:
      "Wet sanding, compound buffing, and clear-coat blending to remove key scratches and scuffs for flawless reflections.",
    badge: "Precision Buff",
    icon: Layers,
  },
  {
    id: "color-changes",
    title: "Color Changes",
    category: "Custom Refinish",
    description:
      "Complete vehicle color conversions including door jambs and under-hood areas, custom metallics, and accent work.",
    badge: "Custom Finish",
    icon: Palette,
  },
  {
    id: "insurance-claim-assistance",
    title: "Insurance Claim Assistance",
    category: "Claims Support",
    description:
      "Direct coordination with all major insurance carriers, itemized estimates, and supplement processing — zero hassle for you.",
    badge: "Zero Hassle",
    icon: FileCheck,
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t border-white/5 bg-[#0B0D11] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F87171]">
            What We Do
          </p>
          <h2 className="font-heading mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Auto Body & Collision Services in Charlotte, NC
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            From a parking-lot door ding to full post-collision reconstruction, every repair is
            measured, straightened, and refinished with the same standard: it should look like it
            never happened.
          </p>
        </div>

        <div data-testid="services-grid" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              data-testid={`service-card-${service.id}`}
              className="group rounded-lg border border-white/10 bg-[#12161E] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#DC2626]/50 hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)]"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#DC2626]/12 text-[#F87171] transition-colors group-hover:bg-[#DC2626]/25">
                  <service.icon className="h-5 w-5" />
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
                Get an estimate
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
