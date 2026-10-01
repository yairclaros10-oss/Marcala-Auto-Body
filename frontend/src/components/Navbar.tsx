import { useState } from "react";
import { Languages, Menu, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BUSINESS, NAV_HREFS } from "@/lib/site";
import { useLang } from "@/lib/i18n";

// Desktop shows Services, About, Our Work, Reviews, Contact (indexes into nav.links).
const DESKTOP = [
  { i: 1, testid: "nav-link-services" },
  { i: 2, testid: "nav-link-about" },
  { i: 3, testid: "nav-link-our-work" },
  { i: 4, testid: "nav-link-reviews" },
  { i: 6, testid: "nav-link-contact" },
];

const MOBILE_TESTIDS = [
  "nav-link-home-mobile",
  "nav-link-services-mobile",
  "nav-link-about-mobile",
  "nav-link-our-work-mobile",
  "nav-link-reviews-mobile",
  "nav-link-estimate-mobile",
  "nav-link-contact-mobile",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const toggle = () => setLang(lang === "en" ? "es" : "en");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0B0D11]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#home" data-testid="nav-logo" className="flex shrink-0 items-center">
          <img
            src="/logo.png"
            alt="Marcala Auto Body — Charlotte, NC"
            className="h-11 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {DESKTOP.map((link) => (
            <a
              key={link.i}
              href={NAV_HREFS[link.i]}
              data-testid={link.testid}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {t.nav.links[link.i]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={toggle}
            data-testid="language-toggle"
            aria-label={t.nav.toggleAria}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-sm font-bold text-white transition-colors hover:border-[#DC2626]/60 hover:bg-white/5"
          >
            <Languages className="h-4 w-4 text-[#DC2626]" />
            {t.nav.toggleLabel}
          </button>
          <a
            href={BUSINESS.phoneTel}
            data-testid="nav-cta-call"
            className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-[#DC2626]/60 hover:bg-white/5"
          >
            <Phone className="h-4 w-4 text-[#DC2626]" />
            {BUSINESS.phoneDisplay}
          </a>
          <a
            href="#estimate"
            data-testid="nav-cta-estimate"
            className="inline-flex items-center rounded-md bg-[#DC2626] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#B91C1C]"
          >
            {t.nav.links[5]}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggle}
            data-testid="language-toggle-mobile"
            aria-label={t.nav.toggleAria}
            className="inline-flex h-10 items-center gap-1.5 rounded-md border border-white/15 px-3 text-sm font-bold text-white"
          >
            <Languages className="h-4 w-4 text-[#DC2626]" />
            {t.nav.toggleLabel}
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              data-testid="nav-mobile-menu-button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white"
              aria-label={t.nav.menuAria}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-white/10 bg-[#12161E] p-0">
              <SheetTitle className="sr-only">{t.nav.menuTitle}</SheetTitle>
              <nav className="flex flex-col gap-1 p-6 pt-14" aria-label="Mobile">
                {NAV_HREFS.map((href, i) => (
                  <a
                    key={href}
                    href={href}
                    data-testid={MOBILE_TESTIDS[i]}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-3 py-3 text-sm font-semibold transition-colors ${
                      i === 5
                        ? "mt-2 bg-[#DC2626] text-center text-white hover:bg-[#B91C1C]"
                        : "text-slate-200 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {t.nav.links[i]}
                  </a>
                ))}
                <a
                  href={BUSINESS.phoneTel}
                  data-testid="nav-cta-call-mobile"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-3 py-3 text-sm font-semibold text-white"
                >
                  <Phone className="h-4 w-4 text-[#DC2626]" />
                  {BUSINESS.phoneDisplay}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
