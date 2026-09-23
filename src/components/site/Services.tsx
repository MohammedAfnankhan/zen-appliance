import { useState } from "react";
import { Check, Info } from "lucide-react";
import { APPLIANCES, type ApplianceKey } from "@/lib/business";

export function Services({ onPick }: { onPick: (key: ApplianceKey, service: string) => void }) {
  const [active, setActive] = useState<ApplianceKey>("ac");
  const current = APPLIANCES.find((a) => a.key === active)!;

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        Services & Repairs
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Pick your appliance to see what we fix.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {APPLIANCES.map((a) => (
          <button
            key={a.key}
            onClick={() => setActive(a.key)}
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
              active === a.key
                ? "bg-ink text-brand-foreground"
                : "border border-border bg-card text-ink hover:bg-accent"
            }`}
          >
            <span className="mr-1.5">{a.emoji}</span>
            {a.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {current.services.map((s) => (
          <button
            key={s}
            onClick={() => onPick(current.key, s)}
            className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cyan/15 text-cyan">
              <Check className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-semibold text-ink">{s}</span>
              <span className="block text-xs text-muted-foreground">
                {current.label} · Book now
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber/50 bg-amber/10 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
        <p className="text-sm font-medium text-ink">
          <span className="font-bold">Transparent Pricing:</span> Nominal inspection fee applies.
          Final exact repair quote given on the spot by our technician after diagnosis.
        </p>
      </div>
    </section>
  );
}
