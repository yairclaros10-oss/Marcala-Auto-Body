import { ClipboardList, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/site";

export default function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 bg-[#0B0D11]/95 backdrop-blur-xl sm:hidden">
      <a
        href={BUSINESS.phoneTel}
        data-testid="mobile-sticky-call-btn"
        className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-white"
      >
        <Phone className="h-4 w-4 text-[#DC2626]" />
        Call Shop
      </a>
      <a
        href="#estimate"
        data-testid="mobile-sticky-estimate-btn"
        className="flex items-center justify-center gap-2 bg-[#DC2626] py-4 text-sm font-semibold text-white"
      >
        <ClipboardList className="h-4 w-4" />
        Get Estimate
      </a>
    </div>
  );
}
