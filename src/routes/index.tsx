import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Booking } from "@/components/site/Booking";
import { Trust } from "@/components/site/Trust";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { BUSINESS, type ApplianceKey } from "@/lib/business";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RapidRepair Doorstep — AC, Washing Machine & Cooler Repair in Mysuru" },
      {
        name: "description",
        content:
          "Same-day doorstep repair and servicing for AC, washing machines and air coolers in Mysuru. Book online or on WhatsApp in under a minute.",
      },
      {
        property: "og:title",
        content: "RapidRepair Doorstep — Appliance Repair in Mysuru",
      },
      {
        property: "og:description",
        content:
          "Doorstep AC, washing machine and air cooler repair in Mysuru. 30-day warranty, genuine parts, 60-min emergency service.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [area, setArea] = useState(BUSINESS.area);
  const [detecting, setDetecting] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [preset, setPreset] = useState<{ appliance: ApplianceKey; service: string } | null>(null);

  const detect = () => {
    if (!navigator.geolocation) {
      setArea("Location not supported — enter landmark");
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=16`,
          );
          const data = (await res.json()) as {
            address?: Record<string, string>;
            display_name?: string;
          };
          const a = data.address ?? {};
          setArea(
            a["suburb"] ??
              a["neighbourhood"] ??
              a["village"] ??
              a["town"] ??
              a["city"] ??
              data.display_name?.split(",")[0] ??
              "Your area",
          );
        } catch {
          setArea(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
        } finally {
          setDetecting(false);
        }
      },
      () => {
        setDetecting(false);
        setArea("Location blocked — enter landmark");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <Hero area={area} detecting={detecting} onDetect={detect} />
      <Services
        onPick={(appliance, service) => {
          setPreset({ appliance, service });
          document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <Booking
        preset={preset}
        area={area}
        detecting={detecting}
        onDetect={detect}
        coords={coords}
      />
      <Trust />
      <Footer />
      <MobileBar />
    </div>
  );
}
