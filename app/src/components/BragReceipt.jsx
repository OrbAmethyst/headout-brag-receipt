import { forwardRef } from "react";
import HeadoutLogo from "./HeadoutLogo.jsx";
import { BARCODE, CARD_W, CARD_H, DESIGN_H } from "../data.js";

// Uniform scale so the handoff type scale (authored for a ~1080×1600 frame)
// fits whatever CARD_H is set to — e.g. Instagram's ideal 1080×1350 portrait.
const k = CARD_H / DESIGN_H;
const z = (n) => n * k;

// Frosted-glass stat card (README "Components" spec, scaled by z()).
function StatCard({ value, unit, label, nowrap, strong }) {
  return (
    <div
      style={{
        background: strong ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.08)",
        border: `1px solid rgba(255,255,255,${strong ? ".2" : ".18"})`,
        borderRadius: z(28),
        padding: `${z(34)}px ${z(36)}px`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.14)",
      }}
    >
      <div
        className="disp"
        style={{
          fontSize: z(62),
          fontWeight: 700,
          letterSpacing: z(-1.5),
          lineHeight: 1,
          whiteSpace: nowrap ? "nowrap" : undefined,
        }}
      >
        {value}
        {unit && (
          <span style={{ fontSize: z(32), fontWeight: 500, marginLeft: z(8) }}>{unit}</span>
        )}
      </div>
      <div style={{ fontSize: z(27), fontWeight: 500, color: "rgba(255,255,255,.82)", marginTop: z(8) }}>
        {label}
      </div>
    </div>
  );
}

/**
 * The Brag Receipt story card — locked to CARD_W × CARD_H (Instagram's ideal
 * 1080 × 1350 portrait). Left-aligned vertical flex; every value tokenized so
 * the same component can be handed to a server-side image renderer.
 */
const BragReceipt = forwardRef(function BragReceipt({ receipt, theme }, ref) {
  return (
    <div
      ref={ref}
      style={{
        width: CARD_W,
        height: CARD_H,
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        fontFamily: "'Halyard Text', sans-serif",
        background: theme.background,
      }}
    >
      {/* Two corner radial accents for depth (percentage-based, no scale) */}
      <div style={{ position: "absolute", inset: 0, background: theme.cornerAccents }} />

      {/* Signature effect: three large blurred light-bloom orbs behind the cards
          (reference positions for the 1080×1920 frame) */}
      <div style={{ position: "absolute", left: 0, right: 0, top: z(1020), height: z(760) }}>
        <div style={{ position: "absolute", left: z(60), top: z(0), width: z(300), height: z(560), borderRadius: "50%", background: `radial-gradient(circle, ${theme.orbs[0]}, rgba(255,255,255,0) 66%)`, filter: `blur(${z(70)}px)`, opacity: 0.85 }} />
        <div style={{ position: "absolute", left: z(360), top: z(-30), width: z(320), height: z(600), borderRadius: "50%", background: `radial-gradient(circle, ${theme.orbs[1]}, rgba(255,255,255,0) 66%)`, filter: `blur(${z(72)}px)`, opacity: 0.8 }} />
        <div style={{ position: "absolute", left: z(680), top: z(0), width: z(330), height: z(580), borderRadius: "50%", background: `radial-gradient(circle, ${theme.orbs[2]}, rgba(255,255,255,0) 66%)`, filter: `blur(${z(74)}px)`, opacity: 0.78 }} />
      </div>

      {/* Content column — handoff padding 84 76 0, scaled */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: `${z(84)}px ${z(76)}px 0`, textAlign: "left" }}>
        {/* 1 · Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: z(16) }}>
            <HeadoutLogo width={z(56)} height={z(31)} color="#fff" />
            <span style={{ fontSize: z(30), fontWeight: 600, letterSpacing: z(-0.5) }}>headout</span>
          </div>
          <div style={{ textAlign: "right", lineHeight: 1.4, fontWeight: 500 }}>
            <div style={{ fontSize: z(18), letterSpacing: z(4), color: "rgba(255,255,255,.55)" }}>BRAG RECEIPT</div>
            <div style={{ fontSize: z(18), letterSpacing: z(3), color: "rgba(255,255,255,.85)" }}>{receipt.receiptNo}</div>
          </div>
        </div>

        {/* 2 · Achievement block */}
        <div style={{ display: "flex", alignItems: "center", gap: z(28), marginTop: z(80) }}>
          <div style={{ position: "relative", width: z(128), height: z(128), flex: "none" }}>
            <div style={{ position: "absolute", inset: z(-28), borderRadius: "50%", background: `radial-gradient(circle, ${theme.halo}, transparent 70%)`, filter: `blur(${z(26)}px)` }} />
            <div style={{ position: "relative", width: z(128), height: z(128), borderRadius: "50%", background: "linear-gradient(150deg,rgba(255,255,255,.28),rgba(255,255,255,.05))", border: `${z(1.5)}px solid rgba(255,255,255,.42)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: z(60), lineHeight: 1 }}>✦</span>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: z(23), letterSpacing: z(6), color: "rgba(255,255,255,.78)" }}>ACHIEVEMENT UNLOCKED</div>
            <div className="disp" style={{ fontSize: z(58), fontWeight: 700, letterSpacing: z(-1.5), marginTop: z(8) }}>{receipt.achievement}</div>
          </div>
        </div>

        {/* 3 · Title block */}
        <div style={{ marginTop: z(70) }}>
          <div style={{ fontWeight: 600, fontSize: z(25), letterSpacing: z(5), color: "rgba(255,255,255,.72)" }}>YOU EXPLORED</div>
          <h1 className="disp" style={{ fontSize: z(90), fontWeight: 700, lineHeight: 1.04, letterSpacing: z(-1.8), margin: `${z(18)}px 0 0`, wordSpacing: z(2) }}>
            {receipt.titleLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <div style={{ marginTop: z(30), fontSize: z(32), fontWeight: 500, color: "rgba(255,255,255,.9)" }}>
            {receipt.location}
          </div>
        </div>

        {/* 4 · Stats grid (2 × 2) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: z(22), marginTop: z(52) }}>
          {receipt.stats.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>

        {/* 5 · Your Moment card */}
        <div style={{ marginTop: z(22), background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", borderRadius: z(28), padding: `${z(34)}px ${z(38)}px`, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.14)" }}>
          <div style={{ fontWeight: 600, fontSize: z(22), letterSpacing: z(5), color: "rgba(255,255,255,.68)" }}>YOUR MOMENT</div>
          <div className="disp" style={{ fontSize: z(38), fontWeight: 600, lineHeight: 1.28, letterSpacing: z(-0.5), marginTop: z(14) }}>{receipt.moment}</div>
        </div>

        {/* 6 · Receipt stub footer (pinned to bottom, full-bleed dashed rule) */}
        <div style={{ marginTop: "auto", marginLeft: z(-76), marginRight: z(-76), padding: `0 ${z(76)}px ${z(56)}px` }}>
          <div style={{ borderTop: `${z(2.5)}px dashed rgba(255,255,255,.32)`, paddingTop: z(32), display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: z(24) }}>
            <div style={{ fontSize: z(22), lineHeight: 1.7, color: "rgba(255,255,255,.85)", fontWeight: 500 }}>
              <div>BOOKED&nbsp;&nbsp;·&nbsp;&nbsp;HEADOUT.COM</div>
              <div>EXPERIENCE&nbsp;&nbsp;·&nbsp;&nbsp;VERIFIED&nbsp;✓</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: z(10) }}>
              <div style={{ display: "flex", gap: z(3), height: z(50), alignItems: "stretch" }}>
                {BARCODE.map((w, i) => (
                  <span key={i} style={{ width: z(w), background: "#fff" }} />
                ))}
              </div>
              <div style={{ fontSize: z(18), letterSpacing: z(3), color: "rgba(255,255,255,.65)" }}>share your brag →</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BragReceipt;
