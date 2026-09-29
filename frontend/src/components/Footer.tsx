import { Mail, MapPin, Phone, Wrench } from "lucide-react";
import { BUSINESS, HOURS, NAV_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#08090C] pb-24 sm:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#DC2626]">
              <Wrench className="h-5 w-5 text-white" />
            </span>
            <span className="font-heading text-lg font-bold tracking-tight text-white">
              MARCALA <span className="text-[#DC2626]">AUTO BODY</span>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            Quality auto body and collision repair in Charlotte, NC. Precise metalwork, exact paint
            matching, and honest communication on every job.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Explore
          </p>
          <nav className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5" aria-label="Footer">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <a
              href={BUSINESS.phoneTel}
              className="flex items-center gap-2.5 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-[#DC2626]" />
              {BUSINESS.phoneDisplay}
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              data-testid="footer-email-link"
              className="flex items-center gap-2.5 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0 text-[#DC2626]" />
              <span className="break-all">{BUSINESS.email}</span>
            </a>
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#DC2626]" />
              {BUSINESS.address}
            </p>
            <div className="border-t border-white/5 pt-3 text-xs leading-relaxed text-slate-500">
              {HOURS.map((h) => (
                <p key={h.days}>
                  {h.days}: {h.time}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-slate-500 sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>© {new Date().getFullYear()} Marcala Auto Body, Charlotte, NC. All rights reserved.</p>
          <p>Some site imagery is placeholder pending real shop photos.</p>
        </div>
      </div>
    </footer>
  );
}
