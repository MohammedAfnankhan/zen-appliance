import { MapPin, Loader2, Zap, Star } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export function Hero({
  area,
  detecting,
  onDetect,
}: {
  area: string;
  detecting: boolean;
  onDetect: () => void;
}) {
  return (
    <section
      id="top"
      className="relative overflow-hidden text-brand-foreground"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan/25 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <button
          onClick={onDetect}
          className="inline-flex max-w-full items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-4 py-2 text-xs font-semibold text-cyan"
        >
          {detecting ? (
            <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
          ) : (
            <MapPin className="h-3.5 w-3.5 shrink-0" />
          )}
          <span className="truncate">Serving {area || BUSINESS.area}</span>
          <span className="shrink-0 rounded-full bg-cyan px-2 py-0.5 text-[10px] font-bold text-cyan-foreground">
            Detect
          </span>
        </button>

        <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Fast & Reliable Doorstep Appliance Repair & Servicing
        </h1>
        <p className="mt-4 max-w-xl text-sm text-brand-foreground/75 sm:text-base">
          Expert technicians for AC, washing machines and air coolers — at your door across{" "}
          {BUSINESS.area}. Book in under a minute.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#book"
            className="rounded-full bg-cyan px-6 py-3 text-sm font-bold text-cyan-foreground shadow-[var(--shadow-lift)]"
          >
            Book a Technician
          </a>
          <a
            href={`tel:${BUSINESS.phoneIntl}`}
            className="rounded-full border border-brand-foreground/25 px-6 py-3 text-sm font-bold"
          >
            Call {BUSINESS.phone}
          </a>
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber/40 bg-amber/15 p-4">
          <Zap className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
          <p className="text-sm font-semibold">
            Need Same-Day Emergency Service? Technician within 60 mins.{" "}
            <span className="rounded-md bg-amber px-2 py-0.5 text-amber-foreground">
              Express charge +₹40
            </span>
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-brand-foreground/70">
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-amber text-amber" /> 4.8 rated by local customers
          </span>
          <span>Service hours {BUSINESS.hours}</span>
        </div>
      </div>
    </section>
  );
}
