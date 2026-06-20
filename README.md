# Handoff: Headout Brag Receipt

## Overview
The **Brag Receipt** turns a completed Headout experience into a personalized, shareable story card instead of a plain booking confirmation. This package documents the **Instagram-Story format (1080 × 1920)**: an "Achievement Unlocked" card featuring the experience name, personalized stats, a memorable-moment quote, and a tear-off receipt stub with a barcode. The hero treatment is a **dark gradient with a soft light-bloom glowing up through frosted-glass stat cards**, rendered across four interchangeable gradient themes.

## About the Design Files
The files in this bundle are **design references created in HTML** (a streaming "Design Component" prototype) — they show the intended look and behavior, they are **not production code to copy directly**. The task is to **recreate this design in the target codebase's existing environment** using its established patterns and libraries.

Because the end artifact is a **shareable image (PNG)**, the real implementation is almost always a **server-side or canvas render**, not a live DOM component. Recommended approaches:
- **Web / Node:** Satori + `@vercel/og` (or `resvg`/Puppeteer) to render the layout to a 1080 × 1920 PNG.
- **iOS:** SwiftUI view rendered with `ImageRenderer`.
- **Android:** Jetpack Compose rendered to a `Bitmap`.

If you implement it as a live React component first, keep every value tokenized (below) so the same component can be handed to the image renderer.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and effects below are final. Recreate pixel-for-pixel at a **1080 × 1920** canvas (export at 2× → 2160 × 3840 for retina). All four gradient themes share one identical layout — only the palette tokens change.

## Screens / Views

### Brag Receipt — Story Card (1080 × 1920)
**Purpose:** Auto-generated after an experience completes; the user shares it to Stories / WhatsApp / etc.

**Layout** (single column, **left-aligned**, vertical flex; canvas padding `84px 76px 0`):
1. **Header row** — space-between. Left: headout logomark (white SVG, 56 × 31) + wordmark "headout" (30px, weight 600, letter-spacing −0.5px). Right (right-aligned, two lines): "BRAG RECEIPT" and "№ 4417-RM" (18px, uppercase, letter-spacing 4px / 3px, ~55–70% white).
2. **Achievement block** (margin-top 80px) — row, gap 28px. A 128 × 128 circular medal (glass fill + 1.5px white-42% border) holding a ✦ glyph (60px), with a **blurred colored halo** behind it (`inset:-28px; radial-gradient(accent); blur(26px)`). Beside it: "ACHIEVEMENT UNLOCKED" (22px, letter-spacing 6px, 70% white) over "History Buff" (Display Bold, 58px, letter-spacing −1.5px).
3. **Title block** (margin-top 70px) — "YOU EXPLORED" eyebrow (24px, letter-spacing 5px, ~65% white); H1 "Colosseum Underground & Arena Floor" (Display Bold, **92px**, line-height 0.96, letter-spacing −3px, three lines via `<br>`); meta row "Rome, Italy • 14 Jun 2026" (30px, weight 500, ~85% white, gap 18px, "•" at 50% opacity).
4. **Stats grid** (margin-top 52px) — `2 × 2`, gap 22px. Four frosted-glass cards (see Components). Order: `4.5 hrs / underground`, `1,973 yrs / of history walked`, `87 / photos captured`, `Top 3% / explorer this month`.
5. **Your Moment card** (margin-top 22px) — full-width frosted card. Eyebrow "YOUR MOMENT" (20px, letter-spacing 5px); quote (Display SemiBold, 36px, line-height 1.25): "“Stood on the arena floor where gladiators once waited.”"
6. **Receipt stub footer** (pinned to bottom, `margin-top:auto`) — full-bleed **2.5px dashed** top rule (white ~32–36%), padding-top 32px. Left, two mono-style lines (20px, weight 500): "BOOKED · HEADOUT.COM" / "EXPERIENCE · VERIFIED ✓". Right: a **barcode** (row of white vertical bars, 50px tall, widths 2–8px) above "share your brag →" (17px, letter-spacing 3px).

**The signature effect — light-bloom behind the cards:** Behind the stats/moment cluster sit **three large blurred radial "orbs"** (≈300–330px wide, 560–600px tall, `border-radius:50%`, `filter:blur(70–76px)`, opacity ~0.55–0.85) in the theme's bright accent colors, positioned in a row (`left: 60 / 360 / 680px`, `top:~1020px`). The frosted cards above them (`backdrop-filter: blur(20px)`) let the glow seep through softly. This is the whole look — keep the blur heavy and the orbs bright.

## Components

### Frosted-glass stat card
- Background: `rgba(255,255,255,0.08)` (lighter themes use `0.10–0.12`)
- Border: `1px solid rgba(255,255,255,0.18)` (lighter themes `0.22–0.28`)
- Radius: `28px`; padding `34px 36px`
- `backdrop-filter: blur(20px)` (and `-webkit-` prefix)
- Stat value: Halyard Display Bold, **62px**, letter-spacing −1.5px (unit suffix e.g. "hrs" at 32px weight 500, margin-left 8px). Add `white-space:nowrap` on values that can wrap (e.g. "Top 3%").
- Stat label: Halyard Text, 24px, color ~72% white, margin-top 4px

### Medal
128 × 128 circle, `background: linear-gradient(150deg, rgba(255,255,255,.28), rgba(255,255,255,.05))`, `border:1.5px solid rgba(255,255,255,.42)`, centered ✦ (60px). Halo: absolutely-positioned div `inset:-28px`, `radial-gradient(circle, <accent .85>, transparent 70%)`, `blur(26px)`.

### Barcode
Flex row, gap 3px, height 50px, ~15 white `<span>` bars of varying widths (3,6,2,8,3,2,7,3,5,2,8,3,6,2,4 px). In production, render from the real booking reference.

## Interactions & Behavior
This is a **static generated image** — no runtime interactivity in the artifact itself. Dynamic pieces to wire to real data: experience name, location, date, the four stat values, the moment quote, achievement name, receipt number, and barcode. (The prototype's only motion was an optional slow float on background orbs; not required for the image export.)

## Design Tokens

### Typography — **Halyard** (Darden Studio, licensed; .ttf files included in `/fonts`)
- **Halyard Display** — headings/stats/quote. Weights: 400/500/600/**700**.
- **Halyard Text** — body, labels, footer. Weights: 400/**500**/600.
- Eyebrows/labels: uppercase, letter-spacing 4–6px.
- Type scale (px @ 1080w): H1 92 · stat value 62 · History Buff 58 · quote 36 · meta 30 · logo 30 · labels 20–24 · footer 17–20.

### Gradient themes (four; pick per card)
| Theme | Background gradient | Bright accent orbs |
|---|---|---|
| **Twilight Tides** | `linear-gradient(168deg,#150a2c,#221152 44%,#3a17a0 78%,#4E00C9)` | #F4C7E6 · #C98BF0 · #EBA6FF |
| **Deep Space** | `linear-gradient(165deg,#0A2353,#112C71 42%,#3b3aa8 76%,#5B58EB)` | #56E1E9 · #5B58EB · #BB63FF |
| **Aurora Blossom** | `linear-gradient(170deg,#193153,#0B5777 38%,#7a5b9e 74%,#EB96FF)` | #F9D4E0 · #EB96FF · #F9D4E0 |
| **Emerald** | `linear-gradient(172deg,#060B0A,#04261c 46%,#016b40)` | #2BFFF8 · #B0FCCE · #15c98a |

Each background also gets two corner radial accents (top + opposite bottom) at ~40–60% opacity for depth.

### Other tokens
- Card radius `28px`; medal/orbs `50%`; canvas padding `84 76`.
- Glass fill `rgba(255,255,255,.08–.12)`, border `rgba(255,255,255,.18–.28)`, backdrop blur `20px`.
- Orb blur `70–76px`, opacity `0.55–0.85`.
- Dashed stub: `2.5px dashed rgba(255,255,255,.32–.36)`.
- White text opacities: primary 100%, secondary ~85%, tertiary ~65–72%, faint ~55%.

## Assets
- **Headout logomark:** `assets/headout-logo.svg` (white, viewBox `0 0 44 24`) — inline it.
- **Fonts:** `/fonts/Halyard-*.ttf` (Display + Text). License with Darden Studio for production; embed as `@font-face`/base64 for image rendering.
- **Colosseum monument image:** the prototype's other variants use either a real photo dropped into an arched/circular "portal," or a generated **Colosseum silhouette** (`assets/colosseum-silhouette.svg`, used as a CSS `mask-image`). For a photo portal, source a licensed venue image.
- ✦ and ✓ are Unicode glyphs (no icon asset needed); barcode is drawn with divs.

## Files
- `Brag Receipt - Glow.dc.html` — **primary reference** (this handoff): the dark glowing-glass design, all four themes side-by-side.
- `assets/headout-logo.svg`, `assets/colosseum-silhouette.svg`
- `fonts/Halyard-*.ttf`
- Sibling explorations in the project (not required, for context): `Brag Receipt - Rosé Portals.dc.html` (rosé mesh + photo/silhouette portals), `Brag Receipt - Monuments.dc.html` (silhouette skyline), `Brag Receipt - Twilight Tides.dc.html`.

> Note on the prototype format: the `.dc.html` files are streaming-preview prototypes. Read them for exact markup/values, but implement using your codebase's framework + image-render pipeline as described above.
