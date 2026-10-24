# Project Requirements Specification — Satara Cafe (सातारा कॅफे)

This document outlines the **System, Software, Dependency, Functional, and Non-Functional Requirements** for running, building, and deploying the **Satara Cafe** web application.

---

## 1. System & Hardware Requirements

### For Developers (Local Build & Development)
- **Operating System**: Windows 10/11, macOS 12+, or Linux (Ubuntu 20.04+ recommended)
- **Processor**: Dual-core CPU (2.0 GHz or higher)
- **RAM**: Minimum 4 GB (8 GB recommended)
- **Storage**: ~350 MB free disk space (for `node_modules` and `dist` build output)
- **Internet Connection**: Required during initial `npm install` and for loading Google Fonts (`Fraunces`, `Rozha One`, `Yatra One`, `Plus Jakarta Sans`)

### For End Users (Customers Visiting the Website)
- **Device**: Any smartphone (Android / iOS), tablet, laptop, or desktop
- **Browser**: Modern ES6+ browser supporting Web Audio API (Chrome 90+, Edge 90+, Safari 15+, Firefox 90+)
- **WhatsApp (Optional)**: Installed on mobile or WhatsApp Web for 1-click order slip and table booking dispatch

---

## 2. Software & Runtime Prerequisites

| Tool | Required Version | Purpose |
| :--- | :--- | :--- |
| **Node.js** | `>= 20.0.0` (LTS recommended) | JavaScript runtime for Vite bundler & dev server |
| **npm** | `>= 10.0.0` | Package manager to install dependencies from `package.json` |
| **Git** | `>= 2.30.0` | Version control & pushing updates to GitHub Pages |

---

## 3. Project Dependencies (`package.json`)

Install all required packages with:
```bash
npm install --legacy-peer-deps
```

### Production Dependencies
| Package | Version | Role in Project |
| :--- | :--- | :--- |
| `react` | `^19.0.1` | Component architecture, hooks, state management |
| `react-dom` | `^19.0.1` | DOM rendering engine |
| `vite` | `^8.3.0` | High-speed development server & static production bundler |
| `@vitejs/plugin-react` | `^6.1.1` | React JSX/TSX compilation plugin for Vite |
| `@tailwindcss/vite` | `^4.3.3` | Tailwind CSS v4 zero-config Vite integration |
| `lucide-react` | `^0.546.0` | Crisp UI iconography |
| `motion` | `^12.23.24` | Smooth UI transitions |

### Development Dependencies
| Package | Version | Role in Project |
| :--- | :--- | :--- |
| `typescript` | `^7.0.2` | Static type checking (`npm run lint`) |
| `tailwindcss` | `^4.3.3` | Utility-first styling system |
| `autoprefixer` | `^10.4.21` | CSS vendor prefixing |
| `@types/react` | `^19.3.0` | TypeScript definitions for React |
| `@types/react-dom` | `^19.3.0` | TypeScript definitions for React DOM |
| `@types/node` | `^22.14.0` | TypeScript definitions for Node.js |

---

## 4. Functional Requirements

1. **Bilingual Interface (English & मराठी)**:
   - Instant toggle between English and Marathi across navigation, menus, receipts, spice stories, and reviews.
2. **7 Standalone Interactive Pages**:
   - **Katta Home**: Live Satara town rush status clock, synthesized cafe murmur audio (Web Audio API), and featured signature dishes.
   - **Menu & Combos**: Category filtering (7 categories), Jain/Spicy dietary filters, live search, item customization, and a 3-step *Katta Combo* builder with automatic ₹20 bundle discount.
   - **Order Slip**: Interactive diner bill with quantity controls, dine-in vs. takeaway packaging fee calculation, printable receipt layout, and 1-click formatted WhatsApp order dispatch (`+91 75586 81179`).
   - **Kitchen Craft**: Interactive 6-compartment brass *Masala Daba* spice explorer and kitchen ritual chronicle.
   - **Cafe Chits & Reviews**: Google Maps rating breakdown (`3.9 ★`), dish mention filters, interactive like counters, and customer review submission modal.
   - **Table Booking**: Group/family reservation form with date, time slot, party size, occasion tags, and WhatsApp booking confirmation ticket.
   - **Sadar Bazar Map & Guide**: 1-click copyable Plus Code (`M2R4+25`), travel time estimator from 5 Satara landmarks, and local visitor guide.

---

## 5. Non-Functional Requirements

- **Zero Commission Architecture**: Direct customer-to-cafe ordering via WhatsApp without third-party aggregator fees.
- **Responsive Mobile-First Layout**: Optimized for mobile QR-code scanning at cafe tables as well as desktop browsing.
- **Static Hosting Ready**: Compiles into pure static HTML/CSS/JS (`dist/`) compatible with GitHub Pages via `.github/workflows/deploy.yml`.
