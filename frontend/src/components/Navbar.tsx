import { useState } from "react";
import { Menu, Phone, Wrench } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BUSINESS, NAV_LINKS } from "@/lib/site";

const DESKTOP_LINKS = [
  { label: "Services", href: "#services", testid: "nav-link-services" },
  { label: "About", href: "#about", testid: "nav-link-about" },
  { label: "Our Work", href: "#work", testid: "nav-link-our-work" },
  { label: "Reviews", href: "#reviews", testid: "nav-link-reviews" },
  { label: "Contact", href: "#contact", testid: "nav-link-contact" },
];

const MOBILE_TESTIDS: Record<string, string> = {
  Home: "nav-link-home-mobile",
  Services: "nav-link-services-mobile",
  About: "nav-link-about-mobile",
  "Our Work": "nav-link-our-work-mobile",
  Reviews: "nav-link-reviews-mobile",
  "Request an Estimate": "nav-link-estimate-mobile",
  Contact: "nav-link-contact-mobile",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0B0D11]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#home" data-testid="nav-logo" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#DC2626]">
            <Wrench className="h-5 w-5 text-white" />
          </span>
          <span className="font-heading text-base font-bold tracking-tight text-white sm:text-lg">
            MARCALA <span className="text-[#DC2626]">AUTO BODY</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {DESKTOP_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={link.testid}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
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
            Request an Estimate
          </a>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            data-testid="nav-mobile-menu-button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 border-white/10 bg-[#12161E] p-0">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="flex flex-col gap-1 p-6 pt-14" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-testid={MOBILE_TESTIDS[link.label]}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-3 text-sm font-semibold transition-colors ${
                    link.label === "Request an Estimate"
                      ? "mt-2 bg-[#DC2626] text-center text-white hover:bg-[#B91C1C]"
                      : "text-slate-200 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={BUSINESS.phoneTel}
                data-testid="nav-cta-call-mobile"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-3 py-3 text-sm font-semibold text-white"
              >
                <Phone className="h-4 w-4 text-[#DC2626]" />
                Call {BUSINESS.phoneDisplay}
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
