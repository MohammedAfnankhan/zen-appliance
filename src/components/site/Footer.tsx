import { Mail, MessageCircle, Phone } from "lucide-react";
import { BUSINESS, DEVELOPER } from "@/lib/business";
import devPhoto from "@/assets/developer.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-ink pb-28 pt-14 text-brand-foreground md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-extrabold">{BUSINESS.name}</h3>
          <p className="mt-2 text-sm text-brand-foreground/70">
            Owner: {BUSINESS.owner} · Doorstep appliance repair across {BUSINESS.area}.
          </p>
          <p className="mt-1 text-sm text-brand-foreground/70">Service hours: {BUSINESS.hours}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`tel:${BUSINESS.phoneIntl}`}
              className="inline-flex items-center gap-2 rounded-full bg-cyan px-4 py-2 text-sm font-bold text-cyan-foreground"
            >
              <Phone className="h-4 w-4" /> {BUSINESS.phone}
            </a>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-foreground/25 px-4 py-2 text-sm font-bold"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-brand-foreground/15 bg-brand-foreground/5 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-cyan">
            Website Designed & Maintained By
          </p>
          <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
            <img
              src={devPhoto.url}
              alt={DEVELOPER.name}
              className="h-20 w-20 shrink-0 rounded-2xl object-cover object-top"
            />
            <div className="min-w-0">
              <p className="truncate text-lg font-extrabold">{DEVELOPER.name}</p>
              <p className="text-xs text-brand-foreground/70">{DEVELOPER.title}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`https://wa.me/${DEVELOPER.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cyan px-4 py-2 text-xs font-bold text-cyan-foreground"
            >
              <MessageCircle className="h-3.5 w-3.5" /> {DEVELOPER.phone}
            </a>
            <a
              href={`mailto:${DEVELOPER.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-brand-foreground/25 px-4 py-2 text-xs font-bold"
            >
              <Mail className="h-3.5 w-3.5" /> Email
            </a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-xs text-brand-foreground/50">
        © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
      </p>
    </footer>
  );
}
