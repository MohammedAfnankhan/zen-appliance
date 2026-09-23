export const BUSINESS = {
  name: "RapidRepair Doorstep",
  owner: "Rehman",
  phone: "7026657971",
  phoneIntl: "+917026657971",
  whatsapp: "917026657971",
  area: "Mysuru",
  hours: "8:00 AM – 9:00 PM (All days)",
};

export const DEVELOPER = {
  name: "Mohammed Afnan Khan",
  title: "Lead Web Developer & Tech Consultant",
  phone: "9110626020",
  whatsapp: "919110626020",
  email: "khanafnan52452@gmail.com",
};

export type ApplianceKey = "ac" | "washing" | "cooler";

export const APPLIANCES: {
  key: ApplianceKey;
  label: string;
  emoji: string;
  services: string[];
}[] = [
  {
    key: "ac",
    label: "Air Conditioner",
    emoji: "❄️",
    services: [
      "General Servicing",
      "Deep Cleaning",
      "Gas Charging",
      "Cooling Issue Fix",
      "PCB Repair",
      "Installation / Uninstallation",
    ],
  },
  {
    key: "washing",
    label: "Washing Machine",
    emoji: "🌀",
    services: [
      "General Servicing",
      "Top Load Repair",
      "Front Load Repair",
      "Semi-Automatic Repair",
      "Drum Issues",
      "Water Leaking",
      "Power / Motherboard Repair",
    ],
  },
  {
    key: "cooler",
    label: "Air Cooler",
    emoji: "💨",
    services: [
      "Complete Servicing",
      "Motor Replacement",
      "Water Pump Repair",
      "Cooling Pad Replacement",
      "Wiring Fixes",
    ],
  },
];

export const TIME_SLOTS = [
  "08:00 – 10:00 AM",
  "10:00 – 12:00 PM",
  "12:00 – 02:00 PM",
  "02:00 – 04:00 PM",
  "04:00 – 06:00 PM",
  "06:00 – 08:00 PM",
];

export const MAX_PER_SLOT = 2;
