# Doorstep Tech Connect

Create a modern, high-converting, mobile-first responsive web application for an Doorstep Home Appliance Repair & Servicing Business (AC, Washing Machine, Air Cooler).

### 🎨 Brand & Visual Style

- **Colors:** Deep Blue primary (#0F172A / #1E40AF), Bright Cyan accent (#06B6D4), Clean White background (#FAFAFA), Amber/Gold badges for emergency callouts (#F59E0B).

- **Typography:** Modern, clean sans-serif (Inter or Plus Jakarta Sans).

- **Layout:** Fully responsive (optimized for high performance on both mobile screens and desktop monitors).

---

### 📌 Core Features & Page Sections

1. **Sticky Header & Floating Action Bar:**

   - Top Header with business logo, contact number, and "Book Service" CTA button.

   - **Mobile-only Floating Bottom Bar:** Fixed at the bottom of mobile viewports with two equal buttons:

     - 📞 "Call Now" (tel: link)

     - 💬 "Book via WhatsApp" (direct chat trigger)

2. **Hero Section:**

   - Catchy Headline: "Fast & Reliable Doorstep Appliance Repair & Servicing"

   - **Live Location / Landmark Badge:** Interactive badge showing "Serving [Detect Customer Area / Enter Nearby Landmark]". Include a button to auto-detect location using HTML5 Geolocation API.

   - **Same-Day Emergency Service Banner:** Highlighting "⚡ Need Same-Day Emergency Service? Get a technician within 60 mins (Express Same-Day Charge: +₹40)".

3. **Services & Repairs Grid:**

   - Filterable tab cards for:

     - **Air Conditioner (AC):** General Servicing, Deep Cleaning, Gas Charging, Cooling Issue Fix, PCB Repair, Installation / Uninstallation.

     - **Washing Machine:** General Servicing, Top Load, Front Load, Semi-Automatic, Drum Issues, Water Leaking, Power/Motherboard Repairs.

     - **Air Cooler:** Complete Servicing, Motor Replacement, Water Pump Repair, Cooling Pad Replacement, Wiring Fixes.

   - **Pricing Note Banner:** Prominently display: "Transparent Pricing: Nominal inspection fee applies. Final exact repair quote given on the spot by our technician after diagnosis."

4. **Dynamic Interactive Booking Form (All-in-One Single Page):**

   - **Step 1:** Customer Full Name & Mobile Number (with phone validation).

   - **Step 2:** Address details with "Use My Current Live Location" GPS button + "Nearby Landmark" input field.

   - **Step 3:** Select Appliance (AC / Washing Machine / Air Cooler) with icon buttons.

   - **Step 4:** Select Problem Type (Checklist of common issues + dynamic "Other Problem Description" text box).

   - **Step 5:** Select Service Date & Time Slot.

   - **Real-Time Slot Availability Engine:** 

     - Maintain an internal mock database/state of booked slots (e.g., maximum 2 bookings per time slot).

     - Dynamically check slot availability when the user selects a time.

     - If a slot is full, show a red badge "Slot Full / Technician Busy" and disable selection, suggesting the next available time slot.

5. **Hybrid Lead Delivery System:**

   - Upon clicking "Confirm Booking":

     1. Automatically format a structured text message and open WhatsApp targeting the mechanic's phone number (`+91XXXXXXXXXX`).

     2. Simultaneously save the booking details (Name, Phone, Location, Appliance, Issue, Date, Slot) to a local state / Supabase table / Google Sheets API endpoint.

     3. Display an interactive On-Screen Success Confirmation Modal with a Booking Reference ID and summary.

6. **Trust Badges & Quality Guarantee:**

   - 🛡️ 30-Day Service Warranty

   - 🔧 100% Genuine Replacement Parts

   - ⏱️ On-Time Doorstep Technician

7. **Footer & Developer Credits Section:**

   - **Mechanic / Business Info:** Owner Name, Direct Contact Number, Service Hours (8 AM - 9 PM).

   - **Website Developer Showcase:** A sleek "Website Designed & Maintained By" card featuring:

     - Developer Profile Photo (using provided cropped photo)

     - Developer Name & Title: "Lead Web Developer & Tech Consultant"

     - Direct Contact / Portfolio link button.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bc2608a6-feb5-4b2b-bbb2-0816d1e9b1e8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## 📸 Application Screenshots

![Hero & Services Section](https://github.com/user-attachments/assets/daa16231-7e1e-454b-a0ce-c11399c002bd)

![Booking Form View](https://github.com/user-attachments/assets/5de4d7d6-0871-4365-b9ef-d44f9bdd59b8)

![Service Details Section](https://github.com/user-attachments/assets/1c09adab-83ec-4bd7-b7c1-3019e45fdc55)

![Mobile Interface View](https://github.com/user-attachments/assets/3679cdc6-6254-4f1a-bddd-a34bd96524bc)

