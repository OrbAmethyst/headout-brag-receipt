# Claude Design — Brag Receipt Launch Promo (paste the block below)

> Tip for max fidelity (optional): after it builds, paste your real Halyard font
> as base64 and your Colosseum photo as a data-URI when Claude Design asks, or in
> a follow-up message. The prompt is written to look great WITHOUT them too.

---

Build a polished **30-second animated launch-promo motion graphic** for a product feature called the **"Brag Receipt."** Output a single self-contained interactive piece that auto-plays on load and loops seamlessly, with a "Replay" button.

## CRITICAL CONSTRAINTS (these prevented a working result last time)
- **Fully self-contained. No external assets of any kind.** Do NOT link external fonts, image URLs, or CDN scripts — they will be blocked and the piece will break.
- **Fonts:** use this stack everywhere: `font-family: "Halyard Display", "Halyard Text", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;`. Don't fetch web fonts; the system fallback must look clean on its own (tight, geometric sans).
- **No real photos.** Wherever an "experience photo" is needed, draw a **CSS Colosseum silhouette** (simple arched-arcade shape via SVG/`clip-path`) over a warm gradient. Label nothing as a placeholder — make it look intentional.
- **Frosted glass must degrade gracefully:** every card uses `backdrop-filter: blur(20px)` AND a solid fallback fill `background: rgba(255,255,255,.09)` so it still reads if blur is unsupported.
- **Animations must actually run:** drive the whole thing from ONE master timeline — a single `requestAnimationFrame` clock (or one master CSS timeline) that starts automatically on load. Don't depend on user interaction to begin.
- Stage: **16:9, 1280×720**, dark cinematic background, centered. Put any controls OUTSIDE the 16:9 stage so a screen-recording of just the stage is clean.

## WHAT THE "BRAG RECEIPT" IS
A completed travel booking turned into a shareable "Achievement Unlocked" story card (Instagram 1080×1920 portrait), with a reward hook: share it, earn credits.

## DESIGN TOKENS (use verbatim)
**Type scale (at 1080px-wide card):** H1 title 90px/700 · stat value 62px/700 · achievement name 58px/700 · quote 38px/600 · location 32px/500 · uppercase eyebrows 22–25px/600 with letter-spacing 5–6px. Display weights use tight letter-spacing (−1.5px).

**Four gradient themes** (same layout, palette only changes):
- **Twilight Tides** — bg `linear-gradient(168deg,#150a2c,#221152 44%,#3a17a0 78%,#4E00C9)`; accent orbs `#F4C7E6 #C98BF0 #EBA6FF`; halo `rgba(172,104,242,.85)`.
- **Deep Space** — bg `linear-gradient(165deg,#0A2353,#112C71 42%,#3b3aa8 76%,#5B58EB)`; orbs `#56E1E9 #5B58EB #BB63FF`; halo `rgba(91,88,235,.85)`.
- **Aurora Blossom** — bg `linear-gradient(170deg,#193153,#0B5777 38%,#7a5b9e 74%,#EB96FF)`; orbs `#F9D4E0 #EB96FF #F9D4E0`; halo `rgba(235,150,255,.85)`.
- **Emerald** — bg `linear-gradient(172deg,#060B0A,#04261c 46%,#016b40)`; orbs `#2BFFF8 #B0FCCE #15c98a`; halo `rgba(43,255,248,.8)`.

**Frosted stat card:** bg `rgba(255,255,255,.09)`, border `1px solid rgba(255,255,255,.18)`, radius 28px, padding 34px 36px, `backdrop-filter: blur(20px)`, `box-shadow: inset 0 1px 0 rgba(255,255,255,.14)`.

**Signature effect (the whole look):** behind the cards, 3 large blurred radial orbs (~300–330px wide, 560–600px tall, `border-radius:50%`, `filter: blur(70–76px)`, opacity .55–.85) in the theme's accent colors, glowing UP through the frosted cards. Keep blur heavy, orbs bright.

**Promo banner gradient:** `linear-gradient(105deg,#44113E,#6A1452 28%,#FF49C1 66%,#FFB3AE 90%,#FFF7AD)`, white text, radius 16px, with a diagonal gloss-sweep highlight.

**Purple CTA button:** `linear-gradient(135deg,#4E00C9,#8000ff 55%,#AC68F2)`, white text, radius 14px, shadow `0 8px 20px rgba(108,0,214,.32)`.

## THE RECEIPT CARD (render at 1080×1920, scaled down to fit the stage)
Single left-aligned column, padding `84px 76px 0`, white text:
1. **Header row** (space-between): "headout" wordmark (left) · two right-aligned lines "BRAG RECEIPT" / "№ 4417-RM" (18px, uppercase, wide tracking, ~60% white).
2. **Achievement block** (margin-top 80px): 128px circular medal — glass fill + 1.5px white border + a ✦ glyph, with a blurred colored halo behind it. Beside it: "ACHIEVEMENT UNLOCKED" eyebrow over **"History Buff"** (58px/700).
3. **Title block** (margin-top 70px): "YOU EXPLORED" eyebrow; H1 **"Colosseum / Underground / & Arena Floor"** (90px/700, three lines); "Rome, Italy" (32px/500).
4. **Stats grid** (margin-top 52px): 2×2 frosted cards — `4.5 hrs / underground` · `1,973 yrs / of history walked` · `547 / stairs climbed` · `Top 3% / explorer this month`.
5. **Your Moment card** (margin-top 22px): full-width frosted card; "YOUR MOMENT" eyebrow + quote "Stood on the arena floor where gladiators once waited." (38px/600).
6. **Receipt stub footer** (pinned bottom): 2.5px dashed top rule; left two lines "BOOKED · HEADOUT.COM" / "EXPERIENCE · VERIFIED ✓"; right a barcode (row of white vertical bars, widths 3,6,2,8,3,2,7,3,5,2,8,3,6,2,4) above "share your brag →".

## MOTION VOCABULARY (soft, premium, springy — reuse these eases)
- **Pop-in** (every entrance): `translateY(14px) scale(.97)` → none, 0.22s `cubic-bezier(.2,.8,.25,1)`.
- **Fade**: opacity 0→1, 0.18s ease.
- **Banner gloss sweep**: a diagonal white highlight sliding `-130%`→`130%` across the banner, 3.4s ease-in-out loop (idle most of the cycle, then sweeps).
- **Hover lift** (buttons/icons): `translateY(-2px to -4px)` + slight brightness, 0.14s ease.
- **Orb drift**: slow ambient float on the background orbs.
- No fast or harsh motion anywhere.

## SCENE-BY-SCENE TIMELINE (30s, auto-play, then loop)
Each caption is large display type in the lower third, fading/sliding in (pop-in) and out.
1. **0–3s — Hook.** A clean white "Completed booking" card (Colosseum silhouette thumbnail, title, "View details" + purple "Brag Receipt" button). A cursor glides in; the purple button lifts on hover. Caption: **"Your trip is over. The story isn't."**
2. **3–5.5s — Open.** Click → a blurred backdrop fades in and a small modal (tabs "Glow / Portals" + the shimmering promo banner) pops in.
3. **5.5–9s — Reveal.** The Glow receipt scales up to hero size; its sections **stagger in** (medal halo blooms first, orbs fade up, stats cascade). Caption: **"Meet the Brag Receipt."**
4. **9–14s — Signature glow.** Slow push-in; orbs drift and bloom through the frosted cards. Caption: **"Every stat. Every moment."** (subline: "One shareable card.")
5. **14–19s — Themes.** Four color swatches tap in sequence; the card recolors Twilight → Deep Space → Aurora → Emerald (active swatch scales up with a ring). Caption: **"Four moods."**
6. **19–23s — Styles.** Toggle to "Portals": the Colosseum silhouette fills a glowing **arched** portal, then morphs to an **octagon** portal. Caption: **"Two styles."**
7. **23–27s — Reward.** The promo banner's gloss sweep peaks → a "How it works" card pops up (steps: 1 Share your Brag Receipt · 2 Get Headout Credits · 3 Use on any experience) → a row of share icons (WhatsApp green, Instagram pink, X black, Facebook blue) lifts. Caption: **"Share it. Earn Headout Credits."**
8. **27–30s — Close.** The receipt floats up and out; an end card fades in: "headout" logo, "Brag Receipt" in gradient text, "OUT NOW". Then loop back to scene 1.

## DELIVERABLE
One self-contained file, auto-playing, looping, with a small Replay control placed below the 16:9 stage. Prioritize: correct fonts-fallback, working frosted glass, smooth springy motion, and the heavy bright orb-glow — that glow is the signature of the whole feature.
