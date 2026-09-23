import { MessageCircle, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export function MobileBar() {
  const waLink = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    `Hello ${BUSINESS.name}, I need appliance repair service.`,
  )}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <a
        href={`tel:${BUSINESS.phoneIntl}`}
        className="flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-bold text-brand-foreground"
      >
        <Phone className="h-4 w-4" /> Call Now
      </a>
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl bg-cyan px-4 py-3 text-sm font-bold text-cyan-foreground"
      >
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
    </div>
  );
}
