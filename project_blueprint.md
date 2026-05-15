# <DevD> Project Blueprint & Technical Specification

Acest document reprezintă specificația completă a proiectului **DevD - Client Page**, servind drept ghid pentru mentenanță sau migrare către un framework modern (React/Next.js).

---

## 1. Design System (Aesthetics)
*   **Core Style:** Ultra-Premium Glassmorphism / Liquid Glass.
*   **Typography:**
    *   `font-heading`: Eb Garamond (Serif, Italic, Bold).
    *   `font-sans`: Inter (Sans-serif, Light to Black).
*   **Color Palette:**
    *   Background: `#020203` (Deep Obsidian).
    *   Glass: `rgba(255, 255, 255, 0.03)` with `backdrop-filter: blur(40px)`.
    *   Accent: `#ff00ff` (Magenta/Pink Spotlight) & `#7c3aed` (Violet).
    *   Text: Pure White (`#fff`) with varying opacities (40%, 60% for secondary).

---

## 2. Global Layout & Structure

### A. Navigation Bar
*   **Structure:** Fixed top, centered container (`w-[90%]`), liquid-glass effect.
*   **Elements:**
    *   Logo: `<DevD>` text-based.
    *   Links: Home, Despre, Servicii, Echipa, Contact (uppercase, high tracking).
    *   CTA: "Consultanță" button with `btn-glass` style.
*   **Responsive:** Links hidden on mobile, simplified UI with mobile-specific spacing.

### B. Hero Section
*   **Visuals:** Large heading with GSAP SplitText animation (character by character reveal).
*   **Background:** Animated liquid blobs (desktop) / Radial gradients (mobile) for performance.
*   **Content:** Tagline focusing on "High Performance" and "Custom Code".

### C. Architectural Stack (The "Showcase")
*   **Design:** 3D tilted glass cards using GSAP and perspective transforms.
*   **Interactions:** `mousemove` parallax that tilts cards slightly (Desktop only).
*   **Responsive:** Transforms are disabled on mobile to prevent layout shifting, using a clean vertical stack instead.

---

## 3. Pricing Section & Calculator

### A. Package Cards (Essential, Bespoke, Elite)
*   **Structure:** 3-column grid (desktop), 1-column (mobile).
*   **Visuals:** Each card is a `liquid-glass` container.
*   **Special State:** "Bespoke" card has a "RECOMMENDED" badge.
*   **Buttons:**
    *   `Explorează Arhitectura`: Opens a fullscreen modal with an iframe.
    *   `Alege Planul`: Direct link to WhatsApp.

### B. Logic Calculator
*   **Stateful Elements:** 
    *   Select box (Package base price).
    *   Checkboxes (Add-ons: 48h Launch, Design Ultra, etc.).
*   **Logic:** `total = basePrice + sum(selectedAddOns)`.
*   **Visuals:** Real-time update of the total price using GSAP number counters.
*   **New Offers:** 
    *   -€30 discount notice for 48h material delivery.
    *   Hosting & Domain information sub-section.

---

## 4. Modal System (The "Demos")
*   **Functionality:** Injects an `<iframe>` dynamically via `js/app.js`.
*   **UI:** Fixed fullscreen overlay with a floating "Rezervă Acest Plan" button and a close button (×).

---

## 5. Technical Requirements for React Migration

### Components Needed:
1.  `<Navbar />`: Should handle active state and scroll-to-id logic.
2.  `<Hero />`: Use `framer-motion` for the text split animations.
3.  `<GlassCard />`: Reusable component for pricing and features.
4.  `<PriceCalculator />`: Use `useState` for the total and add-ons.
5.  `<DemoModal />`: A Portal-based modal for the iframes.

---

## 6. Maintenance Checklist
- [ ] Check `noise.svg` base64 integrity in CSS.
- [ ] Ensure `100dvh` units are used for mobile viewport consistency.
- [ ] Monitor CDN Tailwind performance (migrate to CLI/PostCSS in React).
