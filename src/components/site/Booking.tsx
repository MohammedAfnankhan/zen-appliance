import { useEffect, useMemo, useState } from "react";
import { Loader2, MapPin, CheckCircle2, X } from "lucide-react";
import {
  APPLIANCES,
  BUSINESS,
  MAX_PER_SLOT,
  SHEETS_WEBHOOK,
  TIME_SLOTS,
  type ApplianceKey,
} from "@/lib/business";

type Booking = {
  ref: string;
  name: string;
  phone: string;
  address: string;
  landmark: string;
  appliance: string;
  problems: string[];
  date: string;
  slot: string;
  express: boolean;
  createdAt: string;
};

const STORE_KEY = "rapidrepair_bookings";

function loadBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) ?? "[]") as Booking[];
  } catch {
    return [];
  }
}

function seedIfEmpty(): Booking[] {
  const existing = loadBookings();
  if (existing.length) return existing;
  const today = new Date().toISOString().slice(0, 10);
  const seed = [0, 1].map((i) => ({
    ref: `RR-SEED${i}`,
    name: "Booked",
    phone: "",
    address: "",
    landmark: "",
    appliance: "AC",
    problems: [],
    date: today,
    slot: TIME_SLOTS[1]!,
    express: false,
    createdAt: new Date().toISOString(),
  }));
  localStorage.setItem(STORE_KEY, JSON.stringify(seed));
  return seed;
}

export function Booking({
  preset,
  area,
  detecting,
  onDetect,
  coords,
}: {
  preset: { appliance: ApplianceKey; service: string } | null;
  area: string;
  detecting: boolean;
  onDetect: () => void;
  coords: { lat: number; lng: number } | null;
}) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [appliance, setAppliance] = useState<ApplianceKey>("ac");
  const [problems, setProblems] = useState<string[]>([]);
  const [other, setOther] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [slot, setSlot] = useState("");
  const [express, setExpress] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<Booking | null>(null);

  useEffect(() => setBookings(seedIfEmpty()), []);

  useEffect(() => {
    if (!preset) return;
    setAppliance(preset.appliance);
    setProblems((p) => (p.includes(preset.service) ? p : [...p, preset.service]));
  }, [preset]);

  useEffect(() => {
    if (area && !landmark) setLandmark(area);
  }, [area]); // eslint-disable-line react-hooks/exhaustive-deps

  const current = APPLIANCES.find((a) => a.key === appliance)!;

  const slotCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const b of bookings) if (b.date === date) map[b.slot] = (map[b.slot] ?? 0) + 1;
    return map;
  }, [bookings, date]);

  const isFull = (s: string) => (slotCounts[s] ?? 0) >= MAX_PER_SLOT;
  const nextFree = TIME_SLOTS.find((s) => !isFull(s));

  useEffect(() => {
    if (slot && isFull(slot)) setSlot("");
  }, [date, bookings]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleProblem = (p: string) =>
    setProblems((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  const submit = () => {
    if (!name.trim()) return setError("Please enter your full name.");
    if (!/^[6-9]\d{9}$/.test(phone.trim())) return setError("Enter a valid 10-digit mobile number.");
    if (!address.trim()) return setError("Please enter your address.");
    if (!problems.length && !other.trim()) return setError("Select at least one problem.");
    if (!slot) return setError("Please choose an available time slot.");
    setError("");

    const allProblems = [...problems, ...(other.trim() ? [`Other: ${other.trim()}`] : [])];
    const booking: Booking = {
      ref: `RR-${Date.now().toString().slice(-6)}`,
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      landmark: landmark.trim(),
      appliance: current.label,
      problems: allProblems,
      date,
      slot,
      express,
      createdAt: new Date().toISOString(),
    };

    const updated = [...bookings, booking];
    setBookings(updated);
    localStorage.setItem(STORE_KEY, JSON.stringify(updated));

    // Background sync to Google Sheets (non-blocking)
    void fetch(SHEETS_WEBHOOK, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        name: booking.name,
        phone: booking.phone,
        location: [booking.address, booking.landmark]
          .filter(Boolean)
          .join(", ")
          .concat(coords ? ` (https://maps.google.com/?q=${coords.lat},${coords.lng})` : ""),
        appliance: booking.appliance,
        issue: allProblems.join(", "),
        slot: `${booking.date} ${booking.slot}${booking.express ? " (Express +₹40)" : ""}`,
      }),
    }).catch(() => {});

    const msg =
      `*New Booking — ${BUSINESS.name}*\n` +
      `Ref: ${booking.ref}\n` +
      `Name: ${booking.name}\n` +
      `Phone: ${booking.phone}\n` +
      `Address: ${booking.address}\n` +
      `Landmark: ${booking.landmark || "-"}\n` +
      (coords ? `Map: https://maps.google.com/?q=${coords.lat},${coords.lng}\n` : "") +
      `Appliance: ${booking.appliance}\n` +
      `Issue: ${allProblems.join(", ")}\n` +
      `Date: ${booking.date}\n` +
      `Slot: ${booking.slot}\n` +
      `Express same-day (+₹40): ${booking.express ? "Yes" : "No"}`;

    window.open(
      `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener",
    );
    setSuccess(booking);
  };

  const field =
    "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-ink outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/25";
  const step = "text-xs font-bold uppercase tracking-widest text-cyan";

  return (
    <section id="book" className="mx-auto max-w-3xl px-4 py-14">
      <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        Book Your Service
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        One short form — we confirm on WhatsApp instantly.
      </p>

      <div className="mt-6 space-y-7 rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-7">
        <div className="space-y-3">
          <p className={step}>Step 1 · Your details</p>
          <input
            className={field}
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={field}
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <div className="space-y-3">
          <p className={step}>Step 2 · Address</p>
          <textarea
            className={field}
            rows={2}
            placeholder="House / flat, street, area"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)]">
            <button
              type="button"
              onClick={onDetect}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-bold text-brand-foreground"
            >
              {detecting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
              Use My Live Location
            </button>
            <input
              className={field}
              placeholder="Nearby landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className={step}>Step 3 · Appliance</p>
          <div className="grid grid-cols-3 gap-2">
            {APPLIANCES.map((a) => (
              <button
                key={a.key}
                type="button"
                onClick={() => {
                  setAppliance(a.key);
                  setProblems([]);
                }}
                className={`rounded-2xl border p-3 text-center text-xs font-semibold transition-colors ${
                  appliance === a.key
                    ? "border-cyan bg-cyan/10 text-ink"
                    : "border-border text-muted-foreground hover:bg-accent"
                }`}
              >
                <span className="block text-xl">{a.emoji}</span>
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className={step}>Step 4 · Problem</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {current.services.map((s) => (
              <label
                key={s}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm ${
                  problems.includes(s) ? "border-cyan bg-cyan/10" : "border-border"
                }`}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-cyan"
                  checked={problems.includes(s)}
                  onChange={() => toggleProblem(s)}
                />
                <span className="text-ink">{s}</span>
              </label>
            ))}
          </div>
          <textarea
            className={field}
            rows={2}
            placeholder="Other problem description (optional)"
            value={other}
            onChange={(e) => setOther(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <p className={step}>Step 5 · Date & time slot</p>
          <input
            type="date"
            className={field}
            value={date}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="grid gap-2 sm:grid-cols-2">
            {TIME_SLOTS.map((s) => {
              const full = isFull(s);
              return (
                <button
                  key={s}
                  type="button"
                  disabled={full}
                  onClick={() => setSlot(s)}
                  className={`flex items-center justify-between rounded-xl border p-3 text-sm font-semibold transition-colors ${
                    full
                      ? "cursor-not-allowed border-destructive/30 bg-destructive/5 text-muted-foreground"
                      : slot === s
                        ? "border-cyan bg-cyan/10 text-ink"
                        : "border-border text-ink hover:bg-accent"
                  }`}
                >
                  <span>{s}</span>
                  {full ? (
                    <span className="rounded-md bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">
                      Slot Full
                    </span>
                  ) : (
                    <span className="text-[10px] text-muted-foreground">
                      {MAX_PER_SLOT - (slotCounts[s] ?? 0)} left
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {TIME_SLOTS.some(isFull) && (
            <p className="text-xs font-medium text-muted-foreground">
              {nextFree
                ? `Some slots are busy — next available: ${nextFree}`
                : "All slots booked for this date. Please pick another date."}
            </p>
          )}
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-amber/50 bg-amber/10 p-3 text-sm">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-cyan"
              checked={express}
              onChange={(e) => setExpress(e.target.checked)}
            />
            <span className="text-ink">
              ⚡ Express same-day emergency visit within 60 mins (+₹40)
            </span>
          </label>
        </div>

        {error && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={submit}
          className="w-full rounded-2xl bg-brand px-6 py-4 text-base font-extrabold text-brand-foreground shadow-[var(--shadow-lift)]"
        >
          Confirm Booking
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Your booking opens WhatsApp to {BUSINESS.owner} and is saved for our records.
        </p>
      </div>

      {success && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-card p-6 shadow-[var(--shadow-lift)]">
            <div className="flex items-start justify-between">
              <CheckCircle2 className="h-10 w-10 text-cyan" />
              <button onClick={() => setSuccess(null)} aria-label="Close">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <h3 className="mt-3 text-xl font-extrabold text-ink">
              Booking Confirmed! Redirecting to WhatsApp...
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Reference ID:{" "}
              <span className="font-bold text-cyan">{success.ref}</span>
            </p>
            <dl className="mt-4 space-y-2 rounded-2xl bg-secondary p-4 text-sm">
              {[
                ["Name", success.name],
                ["Phone", success.phone],
                ["Appliance", success.appliance],
                ["Issue", success.problems.join(", ")],
                ["Landmark", success.landmark || "—"],
                ["Date", success.date],
                ["Slot", success.slot],
                ["Express", success.express ? "Yes (+₹40)" : "No"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[90px_minmax(0,1fr)] gap-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <button
              onClick={() => setSuccess(null)}
              className="mt-5 w-full rounded-xl bg-ink py-3 text-sm font-bold text-brand-foreground"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
