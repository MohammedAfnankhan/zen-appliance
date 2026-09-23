const ITEMS = [
  { icon: "🛡️", title: "30-Day Service Warranty", text: "Free re-visit if the issue returns." },
  { icon: "🔧", title: "100% Genuine Parts", text: "Only original replacement components." },
  { icon: "⏱️", title: "On-Time Doorstep Technician", text: "We arrive within your chosen slot." },
];

export function Trust() {
  return (
    <section className="bg-secondary/60 py-14">
      <div className="mx-auto grid max-w-6xl gap-3 px-4 sm:grid-cols-3">
        {ITEMS.map((i) => (
          <div key={i.title} className="rounded-2xl border border-border bg-card p-5">
            <div className="text-2xl">{i.icon}</div>
            <h3 className="mt-3 font-bold text-ink">{i.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{i.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
