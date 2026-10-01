import { useLang } from "@/lib/i18n";

export default function Marquee() {
  const { t } = useLang();
  const row = [...t.services.items, ...t.services.items];

  return (
    <div
      data-testid="services-marquee"
      aria-hidden="true"
      className="overflow-hidden border-y border-white/5 bg-[#08090C] py-5"
    >
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((service, i) => (
          <span
            key={`${service.title}-${i}`}
            className="flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500"
          >
            {service.title}
            <span className="text-[#DC2626]">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
