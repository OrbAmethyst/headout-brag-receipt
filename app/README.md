# Headout — My Bookings + Brag Receipt (React)

A React app that recreates the Headout **My bookings → Completed** page and, on
each completed booking, generates the **Brag Receipt** — the shareable
1080 × 1920 "Achievement Unlocked" story card from the design handoff.

## Run it

> Requires **Node.js 18+** (this machine had none — install from
> <https://nodejs.org> first).

```bash
cd app
npm install
npm run dev        # → http://localhost:5173
```

Build a static bundle:

```bash
npm run build      # outputs dist/
npm run preview    # serve the built bundle
```

## How it works

1. Open the page → **Completed** tab shows the two Uffizi bookings.
2. On the completed (non-cancelled) booking, click **✦ Get your Brag Receipt**
   (placed right after the "Show inclusions & important info" line).
3. A clean popup opens the receipt described in the handoff `README.md`, with
   all four gradient palettes (Twilight Tides, Deep Space, Aurora Blossom,
   Emerald) switchable live via circular colour thumbnails.
4. The footer has **share to WhatsApp / Instagram / X / Facebook / Copy link**
   plus **Save PNG**, which exports the card at **2×** (retina).

The canvas is **1080 × 1350 — Instagram's ideal portrait (4:5)** — exported at
**2× → 2160 × 2700**, so it stays high-quality on every platform. The on-screen
preview is shrunk for the share widget, but the export is always full-res.
`CARD_W` / `CARD_H` / `DESIGN_H` live in `src/data.js`; the receipt scales its
type and spacing by `CARD_H / DESIGN_H`, so changing the canvas (e.g. to
1080 × 1920 for a full Story) re-fits the layout automatically with no clipping.

## Structure

```
app/
├─ index.html
├─ public/
│  ├─ fonts/Halyard-*.ttf          # local @font-face (Display + Text)
│  └─ assets/                      # headout-logo.svg, uffizi.jpg, colosseum-silhouette.svg
└─ src/
   ├─ data.js                      # design tokens: THEMES, BARCODE, BOOKINGS, receipt content
   ├─ styles.css                   # bookings-page styles + modal chrome
   └─ components/
      ├─ Header.jsx                # logo, search, nav
      ├─ BookingsPage.jsx          # tabs + list + modal state
      ├─ BookingCard.jsx           # one booking; renders the Brag Receipt CTA
      ├─ RatingWidget.jsx          # the green "rate your experience" strip
      ├─ HeadoutLogo.jsx           # inline logomark (currentColor)
      ├─ BragReceipt.jsx           # the 1080×1920 card — fully prop-driven
      └─ BragReceiptModal.jsx      # fit-to-viewport, theme switch, PNG export
```

## Design fidelity

`BragReceipt.jsx` is a faithful, **tokenized** port of `Brag Receipt - Glow.dc.html`
and the handoff `README.md`: exact gradients, corner accents, three blurred
light-bloom orbs, frosted-glass stat cards (`backdrop-filter: blur(20px)`),
medal + halo, dashed receipt stub, and div-drawn barcode. Every value is a prop,
so the same component can be handed to a server-side image renderer
(Satori / `@vercel/og`) for production PNG generation.

All booking + receipt content lives in `src/data.js` — wire it to real booking
data there.
