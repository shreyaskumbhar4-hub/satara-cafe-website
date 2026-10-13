# Satara Cafe (सातारा कॅफे) ☕️

> **An authentic, artisanal 7-page web application built for Satara Cafe in Sadar Bazar, Satara, Maharashtra.**  
> Crafted with an anti-corporate local-first aesthetic, bilingual (English & मराठी) support, interactive combo meal builder, real-time town rush clock, ambient cafe synthesizer, and direct 1-click WhatsApp order dispatch.

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache_2.0-green.svg)](LICENSE)

---

### 🌐 Live Website Link
👉 **[https://shreyaskumbhar4-hub.github.io/satara-cafe-website/](https://shreyaskumbhar4-hub.github.io/satara-cafe-website/)**

---

## 🌟 Why This Project is Unique

Most cafe and restaurant websites look like generic corporate tech startups with blurry stock photos, robotic AI copywriting, and clunky PDF menus. 

**Satara Cafe was designed with the opposite philosophy:**
- **Zero Stock Photo Slop**: Uses high-resolution, textured culinary imagery showing golden crispy folds on natural banana leaves, coarse garlic-peanut thecha, and steaming brass dabarah filter coffee.
- **Zero Corporate Icon Grids**: Eliminates artificial 2D vector icons (like coffee bean icons for "Premium Beans"). Storytelling is driven by editorial typography, genuine customer words, and physical cafe rituals.
- **Warm Artisanal Palette**: Grounded in aged paper ivory (`#fcf8f2`), rich masala terracotta (`#9c3418`), warm brass gold (`#c88937`), and deep coffee bark (`#241a15`).
- **Devanagari & Serif Typography**: Characterful typography pairings featuring Google Fonts *Fraunces*, *Rozha One*, *Yatra One*, and *Plus Jakarta Sans*.
- **Zero Swiggy / Zomato Commissions**: Direct table slip billing that routes orders directly to the owner's WhatsApp (`+91 75586 81179`) with formatted line items and pricing.

---

## 📑 7 Interactive Pages & Modules

| # | Page | Key Interactive Capabilities |
|---|---|---|
| **1** | **Katta Atmosphere (`/home`)** | Live Satara Town Clock, dynamic rush stage meter (Morning Peak, Afternoon Katta, Evening Rush), interactive browser-based cafe murmur audio synthesizer, daily blackboard special. |
| **2** | **Artisanal Menu & Combos (`/menu`)** | Full categorized menu (18+ dishes), bilingual instant search, dietary/budget filters, item customizer modal, and an interactive **Katta Combo Maker** (Pick Main + Snack + Drink with auto-bundle discount). |
| **3** | **Table Order Slip (`/order-slip`)** | Authentic perforated kraft-paper ordering chit with live quantity steppers, Dine-In vs Takeaway mode (+₹5 box fee), kitchen instructions, and 1-click WhatsApp dispatch or print slip (`window.print`). |
| **4** | **Kitchen Craft & Spices (`/story-craft`)** | **Interactive Brass Spice Box** with 6 clickable katoris (Mustard, Thecha, Bhajani Grain, Curry Leaves, Byadgi Chili, Chicory Coffee), 3 counter rituals, and high-res photography gallery. |
| **5** | **Pinned Cafe Chits (`/reviews`)** | Real Google reviews from Local Guides (*Tony*, *Rushikesh Wangde*, *SumeetS Kale*), verified 3.9 ★ (212 reviews) breakdown bars, and working interactive *"Pin a Review"* modal with live reactions. |
| **6** | **Table Booking & Rides (`/table-booking`)** | Group reservation desk for morning cycling/bike ride breakfasts, evening college hangouts, and family tiffin outings with party size selector and WhatsApp table booking ticket. |
| **7** | **Sadar Bazar Map & Guide (`/location`)** | Sadar Bazar neighborhood coordinates, Google Plus Code (`M2R4+25`) 1-click copy, interactive travel time calculator from 5 Satara landmarks, and day-trip guide for Ajinkyatara & Kaas Plateau. |

---

## 🛠️ Tech Stack

- **Framework**: React 19 (Hooks, Functional Architecture)
- **Language**: TypeScript 5.x
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 with custom `@theme` tokens
- **Audio Synthesis**: Web Audio API (client-side brown/pink noise generator with warm low-pass filters)
- **Icons**: Lucide React
- **Typography**: Fraunces, Rozha One, Yatra One, Plus Jakarta Sans

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/shreyaskumbhar4-hub/satara-cafe-website.git
cd satara-cafe-website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 4. Build for production
```bash
npm run build
```
The optimized, static build will be generated in the `dist/` directory.

---

## 🌐 Production Deployments

- **GitHub Pages (Live)**: [https://shreyaskumbhar4-hub.github.io/satara-cafe-website/](https://shreyaskumbhar4-hub.github.io/satara-cafe-website/)
- **Vercel / Netlify**: Connect this repo to Vercel or Netlify for instant zero-configuration hosting.

---

## 💼 Business & Sales Strategy for Local Cafes

This project serves as a turnkey portfolio template for selling high-converting digital storefronts to tier-2 & tier-3 city restaurant owners:
1. **Google Maps Integration**: Adds the missing official website link on Google Business Profile to boost local SEO and highway traveler footfall.
2. **Direct WhatsApp Ordering**: Bypasses aggregator commissions (20%–30%) on takeaway orders.
3. **Table QR Code Standees**: Print table tent cards with a QR code linking to this web app so seated customers can browse and order without waiting for staff.

---

## 📄 License

Licensed under the [Apache-2.0 License](LICENSE).
