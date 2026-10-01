import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS, NAV_HREFS, SOCIAL_LINKS } from "@/lib/site";
import { TikTokIcon } from "@/components/Social";
import { useLang } from "@/lib/i18n";
import { fill } from "@/lib/translations";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-white/10 bg-[#08090C] pb-24 sm:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <a href="#home" className="flex items-center">
            <img
              src="/logo.png"
              alt="Marcala Auto Body — Charlotte, NC"
              className="h-16 w-auto"
            />
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">{t.footer.tagline}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-social-facebook"
              aria-label="Marcala Auto Body on Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-400 transition-colors hover:border-[#DC2626]/60 hover:text-[#F87171]"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-social-instagram"
              aria-label="Marcala Auto Body on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-400 transition-colors hover:border-[#DC2626]/60 hover:text-[#F87171]"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-social-tiktok"
              aria-label="Marcala Auto Body on TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-400 transition-colors hover:border-[#DC2626]/60 hover:text-[#F87171]"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {t.footer.explore}
          </p>
          <nav className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5" aria-label="Footer">
            {NAV_HREFS.map((href, i) => (
              <a
                key={href}
                href={href}
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                {t.nav.links[i]}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {t.footer.contact}
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
              href={BUSINESS.phone2Tel}
              data-testid="footer-phone2-link"
              className="flex items-center gap-2.5 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-[#DC2626]" />
              {BUSINESS.phone2Display}
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
              {t.contact.hours.map((h) => (
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
          <p>{fill(t.footer.copyright, { year: new Date().getFullYear() })}</p>
          <p>{t.footer.placeholderNote}</p>
        </div>
      </div>
    </footer>
  );
}
