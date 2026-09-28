import { BadgeCheck, HeartHandshake, MessageSquareText, Search } from "lucide-react";
import { BUSINESS } from "@/lib/site";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1708805282706-f44730b7e527?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHw0fHxwb2xpc2hlZCUyMGx1eHVyeSUyMGNhciUyMHBhaW50JTIwZGV0YWlsJTIwc2hpbmV8ZW58MHx8fHwxNzkwNjA1Nzg4fDA&ixlib=rb-4.1.0&q=85";

const PILLARS = [
  {
    icon: BadgeCheck,
    title: "Quality Repairs",
    text: "Every vehicle is repaired to factory fit and finish — proper panel gaps, correct alignment, and paint that holds up for years, not weeks.",
  },
  {
    icon: Search,
    title: "Attention to Detail",
    text: "From the first measurement to the final buff, we sweat the small things: jambs, edges, trim lines, and blend transitions most shops skip.",
  },
  {
    icon: MessageSquareText,
    title: "Honest Communication",
    text: "You get a straight answer on what your car needs, what it costs, and how long it takes. No surprises on the invoice, ever.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Satisfaction",
    text: "We treat your vehicle like our own and we are not done until you are happy. That is how a neighborhood shop earns its reputation.",
  },
];

const STEPS = [
  { n: "01", title: "Free Estimate", text: "Bring the car by or send photos — we assess the damage and give you a clear, itemized quote." },
  { n: "02", title: "Approve & Book", text: "Approve the work and we coordinate with your insurance company directly if a claim is involved." },
  { n: "03", title: "Repair & Refinish", text: "Structural work, body work, and paint are completed in-house with quality checks at every stage." },
  { n: "04", title: "Final Inspection", text: "We walk the vehicle with you at pickup so you can see the finished repair before you drive away." },
];

export default function About() {
  return (
    <section id="about" className="border-t border-white/5 bg-[#0B0D11] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-3 rounded-2xl bg-[#DC2626]/10 blur-2xl" />
            <img
              src={ABOUT_IMAGE}
              alt="Technician hand-finishing paintwork at Marcala Auto Body (placeholder photo)"
              className="relative aspect-[4/3] w-full rounded-xl border border-white/10 object-cover"
              loading="lazy"
            />
            <p className="mt-3 text-center text-[11px] uppercase tracking-wider text-slate-500">
              Placeholder photo — real shop photos coming soon
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F87171]">
              About Marcala Auto Body
            </p>
            <h2 className="font-heading mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              A Charlotte Body Shop That Sweats the Details
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300">
              Located on North Tryon Street, Marcala Auto Body has built its name the
              old-fashioned way — one properly repaired vehicle at a time. Whether it is a full
              collision rebuild, a color change, or a scratch you cannot stop staring at, the
              standard never changes: the repair should be invisible.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              We work on all makes and models, coordinate directly with every major insurance
              carrier, and keep you informed at every step — because an accident is stressful
              enough without wondering what is happening to your car.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {PILLARS.map((p) => (
                <div key={p.title} className="flex gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#DC2626]/12 text-[#F87171]">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-lg border border-white/10 bg-[#12161E] p-6 transition-colors hover:border-[#DC2626]/40"
            >
              <p className="font-heading text-2xl font-bold text-[#DC2626]">{s.n}</p>
              <h3 className="font-heading mt-3 text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-xl border border-[#DC2626]/30 bg-gradient-to-r from-[#DC2626]/15 via-[#12161E] to-[#12161E] px-8 py-7 sm:flex-row">
          <p className="text-center text-base font-semibold text-white sm:text-left">
            Have damage you would like us to look at? Estimates are always free.
          </p>
          <div className="flex gap-3">
            <a
              href="#estimate"
              data-testid="about-cta-estimate"
              className="rounded-md bg-[#DC2626] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B91C1C]"
            >
              Request an Estimate
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
