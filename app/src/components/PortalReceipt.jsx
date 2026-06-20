import { forwardRef } from "react";
import HeadoutLogo from "./HeadoutLogo.jsx";
import { BARCODE, CARD_W, CARD_H, DESIGN_H } from "../data.js";

const k = CARD_H / DESIGN_H;
const z = (n) => n * k;

// Portal geometry (design coords). Each frame is sized to its shape's native
// aspect ratio so the SVG isn't distorted; PY (top) is shared.
// Vertical hero band the portal sits in (between the header and the achievement
// subtext). Shield/Octagon are centred in this band; Arch is top-anchored.
const HERO_TOP = 150;
const HERO_BOTTOM = 880;
const HERO_CENTER = (HERO_TOP + HERO_BOTTOM) / 2;
const CONTENT_SPACER = 760; // locks the content top identically across variants

const PORTAL_GEO = {
  arch:    { w: 660, h: 700, top: HERO_TOP }, // shortened from the bottom (was 760)
  shield:  { w: 780, h: 500 }, // bigger; portal.svg rotated 90°         460 : 295
  octagon: { w: 780, h: 563 }, // bigger; portal octagon.svg rotated 90° 554 : 400
};

// Shapes from portal.svg / portal octagon.svg. Used as clip-paths via
// clipPathUnits="objectBoundingBox"; the scale transform normalises the SVG's
// pixel coords into the 0–1 bounding-box space.
const SHIELD_D =
  "M0 72.8156C0 64.5313 6.71573 57.8156 15 57.8156H27.0384C33.0113 57.8156 38.4457 54.2858 41.7706 49.3239C52.5373 33.2564 82.6544 0 147.5 0C212.346 0 242.463 33.2562 253.229 49.3239C256.554 54.2857 261.989 57.8156 267.962 57.8156H280C288.284 57.8156 295 64.5313 295 72.8156V231.801V390.787C295 399.072 288.284 405.787 280 405.787H267.167C261.605 405.787 256.488 408.844 253.127 413.276C241.845 428.151 210.351 460 147.5 460C84.6491 460 53.1551 428.151 41.8733 413.276C38.5122 408.844 33.3946 405.787 27.8326 405.787H15C6.71573 405.787 0 399.072 0 390.787V231.801V72.8156Z";
// rotate 90° about the shape's centre, then normalise the rotated bbox (460×295)
const SHIELD_SCALE = "scale(0.00217391,0.00338983) translate(82.5,-82.5) rotate(90 147.5 230)";
const OCTAGON_D =
  "M274.559 0C279.863 0 284.95 2.107 288.7 5.85742L394.143 111.3C397.893 115.05 400 120.137 400 125.441V274.559C400 275.379 399.949 276.194 399.85 277C399.949 277.806 400 278.621 400 279.441V428.559C400 433.863 397.893 438.95 394.143 442.7L288.7 548.143C284.95 551.893 279.863 554 274.559 554H125.441C120.137 554 115.05 551.893 111.3 548.143L5.85742 442.7C2.10699 438.95 0 433.863 0 428.559V279.441C0 278.621 0.0503192 277.806 0.149414 277C0.0503194 276.194 0 275.379 0 274.559V125.441C0 120.137 2.10699 115.05 5.85742 111.3L111.3 5.85742C115.05 2.10699 120.137 0 125.441 0H274.559Z";
// rotate 90° about the shape's centre, then normalise the rotated bbox (554×400)
const OCTAGON_SCALE = "scale(0.00180505,0.0025) translate(77,-77) rotate(90 200 277)";

const SHAPES = {
  arch:    { ring: true },
  shield:  { clipPath: "url(#br-shield)" },
  octagon: { clipPath: "url(#br-octagon)" },
};

function PortalStatCard({ value, unit, label, nowrap }) {
  return (
    <div style={{
      background: "rgba(255,255,255,.11)",
      border: "1px solid rgba(255,255,255,.22)",
      borderRadius: z(26), padding: `${z(28)}px ${z(32)}px`,
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,.16)",
    }}>
      <div className="disp" style={{ fontSize: z(54), fontWeight: 700, letterSpacing: z(-1.5), lineHeight: 1, whiteSpace: nowrap ? "nowrap" : undefined }}>
        {value}{unit && <span style={{ fontSize: z(28), fontWeight: 500, marginLeft: z(8) }}>{unit}</span>}
      </div>
      <div style={{ fontSize: z(25), fontWeight: 500, color: "rgba(255,255,255,.85)", marginTop: z(6) }}>{label}</div>
    </div>
  );
}

/**
 * Portal receipt — the experience photo as a glowing "portal" hero over a
 * full-bleed darkened version of the same image, in the spirit of the Headout
 * "home to magical experiences" banners. `shape` ∈ arch | squircle | home.
 */
const PortalReceipt = forwardRef(function PortalReceipt({ receipt, theme, shape = "arch" }, ref) {
  const geo = PORTAL_GEO[shape] || PORTAL_GEO.arch;
  const PW = geo.w, PH = geo.h, PX = (1080 - PW) / 2;
  // Arch is top-anchored; Shield/Octagon are centred in the hero band.
  const PY = shape === "arch" ? geo.top : Math.round(HERO_CENTER - PH / 2);
  const archRadius = `${PW / 2}px ${PW / 2}px ${z(44)}px ${z(44)}px`;
  const cfg = SHAPES[shape] || SHAPES.arch;
  const clipStyle = shape === "arch" ? { borderRadius: archRadius } : { clipPath: cfg.clipPath };

  return (
    <div ref={ref} style={{ width: CARD_W, height: CARD_H, position: "relative", overflow: "hidden", color: "#fff", fontFamily: "'Halyard Text', sans-serif", background: "#0b0716" }}>
      {/* SVG clip-path defs for the shield + octagon frames */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <clipPath id="br-shield" clipPathUnits="objectBoundingBox">
            <path d={SHIELD_D} transform={SHIELD_SCALE} />
          </clipPath>
          <clipPath id="br-octagon" clipPathUnits="objectBoundingBox">
            <path d={OCTAGON_D} transform={OCTAGON_SCALE} />
          </clipPath>
        </defs>
      </svg>

      {/* Full-bleed darkened photo */}
      <img src={receipt.photo} alt="" crossOrigin="anonymous" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.5) saturate(1.05)" }} />

      {/* Theme tint over the whole frame */}
      <div style={{ position: "absolute", inset: 0, background: theme.background, opacity: 0.32, mixBlendMode: "soft-light" }} />

      {/* Glow halo behind the portal */}
      <div style={{ position: "absolute", left: PX - z(70), top: PY - z(40), width: PW + z(140), height: PH + z(120), borderRadius: "50%", background: `radial-gradient(circle, ${theme.halo}, transparent 68%)`, filter: `blur(${z(60)}px)`, opacity: 0.9 }} />

      {/* The portal: a bright window into the same photo */}
      <div style={{ position: "absolute", left: PX, top: PY, width: PW, height: PH, overflow: "hidden", ...clipStyle, boxShadow: `0 ${z(30)}px ${z(80)}px rgba(0,0,0,.45)` }}>
        <img src={receipt.photo} alt="" crossOrigin="anonymous" style={{ position: "absolute", left: -PX, top: -PY, width: CARD_W, height: CARD_H, objectFit: "cover", filter: "brightness(1.04) saturate(1.12)" }} />
        {/* colored inner glow + subtle vignette */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 80% at 50% 92%, ${theme.swatch}66, transparent 60%)` }} />
        {/* crisp white ring — only for the border-radius arch frame */}
        {cfg.ring && <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 0 2px rgba(255,255,255,.4)", borderRadius: archRadius }} />}

        {/* achievement cluster — badge + "ACHIEVEMENT UNLOCKED" + name, centred */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: `0 ${z(40)}px` }}>
          <div style={{ position: "relative", width: z(116), height: z(116) }}>
            <div style={{ position: "absolute", inset: z(-24), borderRadius: "50%", background: `radial-gradient(circle, ${theme.halo}, transparent 70%)`, filter: `blur(${z(22)}px)` }} />
            <div style={{ position: "relative", width: z(116), height: z(116), borderRadius: "50%", background: theme.badge, border: `${z(2)}px solid rgba(255,255,255,.75)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 10px 26px rgba(0,0,0,.34), inset 0 ${z(2)}px ${z(6)}px rgba(255,255,255,.45), inset 0 ${z(-10)}px ${z(18)}px rgba(0,0,0,.18)` }}>
              <span style={{ fontSize: z(56), lineHeight: 1, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,.4)" }}>✦</span>
            </div>
          </div>
          <div style={{ marginTop: z(22), fontWeight: 600, fontSize: z(22), letterSpacing: z(5), color: "#240046" }}>ACHIEVEMENT&nbsp;UNLOCKED</div>
          <div className="disp" style={{ marginTop: z(8), fontSize: z(58), fontWeight: 700, letterSpacing: z(-1.5), color: "#141019" }}>{receipt.achievement}</div>
        </div>
      </div>

      {/* Legibility scrim — light at the top (portal), dark at the bottom (content) */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(8,5,20,.45) 0%, rgba(8,5,20,0) 16%, rgba(8,5,20,.15) 40%, rgba(8,5,20,.86) 60%, rgba(8,5,20,.97) 100%)" }} />

      {/* Content */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: `${z(84)}px ${z(76)}px 0` }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: z(16) }}>
            <HeadoutLogo width={z(56)} height={z(31)} color="#fff" />
            <span style={{ fontSize: z(30), fontWeight: 600, letterSpacing: z(-0.5) }}>headout</span>
          </div>
          <div style={{ textAlign: "right", lineHeight: 1.4, fontWeight: 500 }}>
            <div style={{ fontSize: z(18), letterSpacing: z(4), color: "rgba(255,255,255,.7)" }}>BRAG RECEIPT</div>
            <div style={{ fontSize: z(18), letterSpacing: z(3), color: "rgba(255,255,255,.92)" }}>{receipt.receiptNo}</div>
          </div>
        </div>

        {/* Spacer reserving the portal hero region. Locked to the Arch variant's
            height so the content below starts at the SAME position for every
            shape — shorter (rotated) shapes simply get more breathing room. */}
        <div style={{ height: z(CONTENT_SPACER) }} />

        {/* Title (achievement badge + name now live inside the portal above) */}
        <div style={{ marginTop: z(20) }}>
          <h1 className="disp" style={{ fontSize: z(82), fontWeight: 700, lineHeight: 1.02, letterSpacing: z(-1.8), margin: 0 }}>
            {receipt.titleLines.map((line, i) => (
              <span key={i}>{i > 0 && <br />}{line}</span>
            ))}
          </h1>
          <div style={{ marginTop: z(22), fontSize: z(30), fontWeight: 500, color: "rgba(255,255,255,.9)" }}>{receipt.location}</div>
        </div>

        {/* Stats 2×2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: z(18), marginTop: z(36) }}>
          {receipt.stats.map((s, i) => <PortalStatCard key={i} {...s} />)}
        </div>

        {/* Footer stub */}
        <div style={{ marginTop: "auto", marginLeft: z(-76), marginRight: z(-76), padding: `0 ${z(76)}px ${z(52)}px` }}>
          <div style={{ borderTop: `${z(2.5)}px dashed rgba(255,255,255,.34)`, paddingTop: z(28), display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: z(24) }}>
            <div style={{ fontSize: z(21), lineHeight: 1.7, color: "rgba(255,255,255,.85)", fontWeight: 500 }}>
              <div>BOOKED&nbsp;&nbsp;·&nbsp;&nbsp;HEADOUT.COM</div>
              <div>EXPERIENCE&nbsp;&nbsp;·&nbsp;&nbsp;VERIFIED&nbsp;✓</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: z(10) }}>
              <div style={{ display: "flex", gap: z(3), height: z(46), alignItems: "stretch" }}>
                {BARCODE.map((w, i) => <span key={i} style={{ width: z(w), background: "#fff" }} />)}
              </div>
              <div style={{ fontSize: z(18), letterSpacing: z(3), color: "rgba(255,255,255,.7)" }}>share your brag →</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PortalReceipt;
