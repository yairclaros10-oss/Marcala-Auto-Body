import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { BUSINESS, isOpenNow } from "@/lib/site";
import { useLang } from "@/lib/i18n";

export default function Contact() {
  const open = isOpenNow();
  const { t } = useLang();

  return (
    <section id="contact" className="border-t border-white/5 bg-[#0B0D11] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F87171]">
            {t.contact.kicker}
          </p>
          <h2 className="font-heading mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {t.contact.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">{t.contact.sub}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#12161E] p-6">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#DC2626]/12 text-[#F87171]">
                  <Phone className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t.contact.callLabel}
                  </p>
                  <a
                    href={BUSINESS.phoneTel}
                    data-testid="contact-phone-link"
                    className="font-heading text-xl font-bold text-white transition-colors hover:text-[#F87171]"
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>
              </div>
              <a
                href={BUSINESS.phoneTel}
                data-testid="contact-call-now-button"
                className="hidden shrink-0 rounded-md bg-[#DC2626] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B91C1C] sm:inline-flex"
              >
                {t.contact.callNow}
              </a>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#12161E] p-6">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#DC2626]/12 text-[#F87171]">
                  <MapPin className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t.contact.addressLabel}
                  </p>
                  <p data-testid="contact-address-text" className="text-base font-semibold text-white">
                    {BUSINESS.address}
                  </p>
                </div>
              </div>
              <a
                href={BUSINESS.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-directions-button"
                className="hidden shrink-0 items-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5 sm:inline-flex"
              >
                <Navigation className="h-4 w-4 text-[#DC2626]" />
                {t.contact.directions}
              </a>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#12161E] p-6">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#DC2626]/12 text-[#F87171]">
                  <Mail className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t.contact.emailLabel}
                  </p>
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    data-testid="contact-email-link"
                    className="break-all text-base font-semibold text-white transition-colors hover:text-[#F87171]"
                  >
                    {BUSINESS.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#12161E] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#DC2626]/12 text-[#F87171]">
                    <Clock className="h-6 w-6" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t.contact.hoursLabel}
                  </p>
                </div>
                <span
                  data-testid="contact-open-status"
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    open ? "bg-emerald-500/15 text-emerald-400" : "bg-[#DC2626]/15 text-[#F87171]"
                  }`}
                >
                  {open ? t.contact.openNow : t.contact.closed}
                </span>
              </div>
              <table data-testid="contact-hours-table" className="mt-5 w-full text-sm">
                <tbody>
                  {t.contact.hours.map((h) => (
                    <tr key={h.days} className="border-t border-white/5">
                      <td className="py-3 font-medium text-slate-300">{h.days}</td>
                      <td
                        className={`py-3 text-right font-semibold ${
                          h.time === "Closed" || h.time === "Cerrado" ? "text-[#F87171]" : "text-white"
                        }`}
                      >
                        {h.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            data-testid="contact-map-container"
            className="overflow-hidden rounded-xl border border-white/10"
          >
            <iframe
              title={t.contact.mapTitle}
              src={BUSINESS.mapEmbedUrl}
              className="h-full min-h-[420px] w-full grayscale-[35%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
