import { useState } from "react";
import { ChevronsLeftRight, Info } from "lucide-react";

interface RepairCase {
  id: string;
  title: string;
  service: string;
  image: string;
  damage: string;
  repair: string;
}

const CASES: RepairCase[] = [
  {
    id: "case-1",
    title: "Front Quarter Collision",
    service: "Collision & Fender Realignment",
    image:
      "https://images.unsplash.com/photo-1692119439873-7a4be83beeea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxkYW1hZ2VkJTIwY2FyJTIwZGVudCUyMHNjcmF0Y2glMjBjbG9zZXVwfGVufDB8fHx8MTc5MDYwNTc4OHww&ixlib=rb-4.1.0&q=85",
    damage:
      "Crush damage across the fender, cracked bumper cover, and a misaligned panel seam after a front-quarter impact.",
    repair:
      "Panel measurement and straightening, bumper repair and refinish, then a multi-stage paint blend into the adjacent panel.",
  },
  {
    id: "case-2",
    title: "Rear Bumper & Panel Impact",
    service: "Bumper Repair & Paint Matching",
    image:
      "https://images.unsplash.com/photo-1703609438732-2fad53e62a4b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxkYW1hZ2VkJTIwY2FyJTIwZGVudCUyMHNjcmF0Y2glMjBjbG9zZXVwfGVufDB8fHx8MTc5MDYwNTc4OHww&ixlib=rb-4.1.0&q=85",
    damage:
      "Gouged bumper cover and creased panel skin with paint transfer and fractured surface coating.",
    repair:
      "Plastic weld reconstruction, computerized metallic paint match, and a fresh clear coat for a uniform factory shine.",
  },
  {
    id: "case-3",
    title: "Deep Scratch & Door Crease",
    service: "Scratch Repair & Dent Removal",
    image:
      "https://images.unsplash.com/photo-1733928907064-6a92c9ce0e87?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxkYW1hZ2VkJTIwY2FyJTIwZGVudCUyMHNjcmF0Y2glMjBjbG9zZXVwfGVufDB8fHx8MTc5MDYwNTc4OHww&ixlib=rb-4.1.0&q=85",
    damage:
      "A deep scratch penetrating clear and base coat across the door, with a subtle crease in the metal beneath.",
    repair:
      "Dent manipulation, feather-edge micro-sanding, precision tinting, and a baked finish for an invisible repair.",
  },
];

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const current = CASES[active];

  return (
    <section id="before-after" className="border-t border-white/5 bg-[#0E1117] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F87171]">
              Before & After
            </p>
            <h2 className="font-heading mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              See the Difference a Proper Repair Makes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              Drag the slider to compare damage vs. finished repair. These sample cases show the
              kind of transformations we deliver every week.
            </p>
          </div>
          <div className="flex gap-2">
            {CASES.map((c, i) => (
              <button
                key={c.id}
                data-testid={`before-after-tab-${c.id}`}
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
                Case {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div data-testid="before-after-container" className="mt-10 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="relative aspect-[16/10] select-none overflow-hidden rounded-xl border border-white/10">
              <img
                src={current.image}
                alt={`${current.title} — after repair (placeholder photo)`}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <img
                  src={current.image}
                  alt={`${current.title} — before repair (placeholder photo)`}
                  className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 brightness-[0.6]"
                  draggable={false}
                />
              </div>
              <span className="absolute left-3 top-3 rounded-sm bg-black/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                Before — Placeholder
              </span>
              <span className="absolute right-3 top-3 rounded-sm bg-[#DC2626] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                After — Placeholder
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
                aria-label="Drag to compare before and after"
                className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
              />
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-md border border-dashed border-[#DC2626]/40 bg-[#DC2626]/5 px-4 py-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#F87171]" />
              <p className="text-xs leading-relaxed text-slate-400">
                Placeholder imagery — these photos demonstrate the layout only and will be replaced
                with real before-and-after photos of vehicles repaired at Marcala Auto Body.
              </p>
            </div>
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
                    The Damage
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{current.damage}</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#F87171]">
                    The Repair
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
              Get This Done for Your Vehicle
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
