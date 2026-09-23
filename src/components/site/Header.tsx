import { Phone, Wrench } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-cyan-foreground"
            style={{ background: "var(--gradient-cyan)" }}
          >
            <Wrench className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-extrabold tracking-tight text-ink">
              {BUSINESS.name}
            </span>
            <span className="block truncate text-[11px] font-medium text-muted-foreground">
              AC · Washing Machine · Air Cooler
            </span>
          </span>
        </a>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`tel:${BUSINESS.phoneIntl}`}
            className="hidden items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-accent sm:inline-flex"
          >
            <Phone className="h-4 w-4 text-cyan" />
            {BUSINESS.phone}
          </a>
          <a
            href="#book"
            className="inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-bold text-brand-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
          >
            Book Service
          </a>
        </div>
      </div>
    </header>
  );
}
