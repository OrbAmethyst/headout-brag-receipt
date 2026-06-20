import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from "remotion";
import { THEMES, STATS, TITLE, BARCODE } from "./tokens.js";

const DISP = "'Halyard Display', sans-serif";
const TEXT = "'Halyard Text', sans-serif";

const Logo = ({ size = 56 }) => (
  <svg width={size} height={(size * 31) / 56} viewBox="0 0 44 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
    <path d="M42.2496 9.72716C39.1092 15.6533 31.3355 18.6077 23.3215 18.6077C16.9549 18.6077 10.6913 17.7611 5.23424 15.325C18.2763 16.7245 30.9065 16.1716 42.2496 9.72716ZM42.2496 7.2565C38.44 6.11619 35.0079 5.78792 31.4556 5.82248C22.4463 5.89158 13.334 8.62141 5.28572 12.1978C11.6866 6.47901 21.2107 2.31517 30.752 2.31517C35.2996 2.31517 40.5336 4.26751 42.2496 7.2565ZM44 8.5523C44 2.47066 34.8877 0 29.6881 0C21.5368 0 14.6897 2.98899 8.83796 6.27169C8.47759 5.61515 7.96277 5.4942 7.15622 5.39054C5.95498 5.28688 5.21708 5.23504 4.30757 5.23504C3.31225 5.23504 1.81928 5.30415 0.652361 5.4942C0.086062 5.59787 -0.102704 6.04708 0.0517408 6.73818C0.566558 8.62141 1.33878 10.3146 2.35126 11.9041C1.90508 13.4591 2.05953 14.9277 3.34657 16.1371C2.9004 17.9512 2.76311 19.9381 2.83176 21.7349C2.93472 22.4779 3.31225 22.6852 3.93003 22.5815C6.22955 22.2187 8.46043 21.4067 10.3996 20.37C10.8801 20.1109 11.1032 19.8171 11.2404 19.4543L16.9206 20.3355C17.7958 21.2857 18.671 22.0978 19.7349 22.9962C20.4385 23.5145 21.1936 23.8082 22.1203 23.8082C26.256 23.7737 29.7396 23.1517 32.6225 22.0459C33.7551 21.6831 34.596 20.1627 35.8487 18.0376C38.6287 16.6208 44 13.9601 44 8.5523Z" />
  </svg>
);

export const BragPromo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // fade + slide-up helper
  const reveal = (delay, { y = 44, dur = 18 } = {}) => {
    const p = interpolate(frame, [delay, delay + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return { opacity: p, transform: `translateY(${(1 - p) * y}px)` };
  };
  const fade = (a, b) => interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Background cross-fades: Twilight (build) → cycle DeepSpace/Aurora/Emerald → back to Twilight (outro)
  const bgOpacity = [
    interpolate(frame, [0, 250, 272, 340, 360, 420], [1, 1, 0, 0, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(frame, [0, 250, 272, 292, 308, 420], [0, 0, 1, 1, 0, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(frame, [0, 288, 306, 322, 338, 420], [0, 0, 1, 1, 0, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(frame, [0, 322, 340, 352, 362, 420], [0, 0, 1, 1, 0, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  ];

  const glass = { background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 28, padding: "34px 36px", boxShadow: "inset 0 1px 0 rgba(255,255,255,.14)" };

  // medal spring
  const medalS = spring({ frame: frame - 24, fps, config: { damping: 12, stiffness: 110 } });
  const medalScale = 0.4 + 0.6 * medalS;

  // outro
  const outro = fade(362, 388);

  return (
    <AbsoluteFill style={{ fontFamily: TEXT, color: "#fff", overflow: "hidden" }}>
      {/* theme gradient layers (cross-fade) */}
      {THEMES.map((t, i) => (
        <AbsoluteFill key={i} style={{ background: t.bg, opacity: bgOpacity[i] }} />
      ))}
      {/* corner depth */}
      <AbsoluteFill style={{ background: "radial-gradient(120% 70% at 18% 6%, rgba(255,255,255,.10), transparent 50%), radial-gradient(120% 80% at 96% 94%, rgba(0,0,0,.28), transparent 52%)" }} />

      {/* light-bloom orbs (drifting) */}
      {[0, 1, 2].map((i) => {
        const drift = Math.sin((frame / 30) * 0.8 + i * 1.6) * 26;
        const colors = ["#F4C7E6", "#C98BF0", "#EBA6FF"];
        const left = [60, 360, 680][i];
        const w = [300, 320, 330][i];
        const h = [560, 600, 580][i];
        return (
          <div key={i} style={{ position: "absolute", left, top: 1020 + drift, width: w, height: h, borderRadius: "50%", background: `radial-gradient(circle, ${colors[i]}, rgba(255,255,255,0) 66%)`, filter: "blur(72px)", opacity: 0.7 }} />
        );
      })}

      {/* content */}
      <AbsoluteFill style={{ padding: "84px 76px 0", display: "flex", flexDirection: "column" }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", ...reveal(2, { y: 20 }) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Logo />
            <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-.5px", fontFamily: DISP }}>headout</span>
          </div>
          <div style={{ textAlign: "right", lineHeight: 1.4, fontWeight: 500 }}>
            <div style={{ fontSize: 18, letterSpacing: 4, color: "rgba(255,255,255,.6)" }}>BRAG RECEIPT</div>
            <div style={{ fontSize: 18, letterSpacing: 3, color: "rgba(255,255,255,.88)" }}>№ 4417-RM</div>
          </div>
        </div>

        {/* achievement */}
        <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 80 }}>
          <div style={{ position: "relative", width: 128, height: 128, flex: "none", transform: `scale(${medalScale})`, opacity: medalS }}>
            <div style={{ position: "absolute", inset: -26, borderRadius: "50%", background: "radial-gradient(circle, rgba(172,104,242,.85), transparent 70%)", filter: "blur(24px)" }} />
            <div style={{ position: "relative", width: 128, height: 128, borderRadius: "50%", background: THEMES[0].badge, border: "2px solid rgba(255,255,255,.7)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 26px rgba(0,0,0,.34), inset 0 2px 6px rgba(255,255,255,.45)" }}>
              <span style={{ fontSize: 64, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,.4)" }}>✦</span>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 23, letterSpacing: 6, color: "rgba(255,255,255,.78)", ...reveal(40, { y: 24 }) }}>ACHIEVEMENT UNLOCKED</div>
            <div style={{ fontFamily: DISP, fontSize: 58, fontWeight: 700, letterSpacing: "-1.5px", marginTop: 8, ...reveal(50, { y: 28 }) }}>History Buff</div>
          </div>
        </div>

        {/* title */}
        <div style={{ marginTop: 70 }}>
          <div style={{ fontWeight: 600, fontSize: 25, letterSpacing: 5, color: "rgba(255,255,255,.72)", ...reveal(64) }}>YOU EXPLORED</div>
          <h1 style={{ fontFamily: DISP, fontSize: 90, fontWeight: 700, lineHeight: 1.04, letterSpacing: "-1.8px", margin: "18px 0 0" }}>
            {TITLE.map((line, i) => (
              <div key={i} style={reveal(74 + i * 12, { y: 40 })}>{line}</div>
            ))}
          </h1>
          <div style={{ marginTop: 30, fontSize: 32, fontWeight: 500, color: "rgba(255,255,255,.9)", ...reveal(116) }}>Rome, Italy</div>
        </div>

        {/* stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 52 }}>
          {STATS.map((s, i) => {
            const d = 128 + i * 14;
            const sp = spring({ frame: frame - d, fps, config: { damping: 13, stiffness: 130 } });
            return (
              <div key={i} style={{ ...glass, transform: `scale(${0.82 + 0.18 * sp})`, opacity: interpolate(frame, [d, d + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                <div style={{ fontFamily: DISP, fontSize: 62, fontWeight: 700, letterSpacing: "-1.5px", lineHeight: 1, whiteSpace: "nowrap" }}>
                  {s.value}{s.unit && <span style={{ fontSize: 32, fontWeight: 500, marginLeft: 8 }}>{s.unit}</span>}
                </div>
                <div style={{ fontSize: 27, fontWeight: 500, color: "rgba(255,255,255,.82)", marginTop: 8 }}>{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* moment */}
        <div style={{ marginTop: 22, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 28, padding: "34px 38px", boxShadow: "inset 0 1px 0 rgba(255,255,255,.14)", ...reveal(190, { y: 30 }) }}>
          <div style={{ fontWeight: 600, fontSize: 22, letterSpacing: 5, color: "rgba(255,255,255,.68)" }}>YOUR MOMENT</div>
          <div style={{ fontFamily: DISP, fontSize: 38, fontWeight: 600, lineHeight: 1.28, letterSpacing: "-.5px", marginTop: 14 }}>“Stood on the arena floor where gladiators once waited.”</div>
        </div>

        {/* footer */}
        <div style={{ marginTop: "auto", marginLeft: -76, marginRight: -76, padding: "0 76px 60px", ...reveal(212, { y: 20 }) }}>
          <div style={{ borderTop: "2.5px dashed rgba(255,255,255,.32)", paddingTop: 32, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
            <div style={{ fontSize: 22, lineHeight: 1.7, color: "rgba(255,255,255,.85)", fontWeight: 500 }}>
              <div>BOOKED&nbsp;&nbsp;·&nbsp;&nbsp;HEADOUT.COM</div>
              <div>EXPERIENCE&nbsp;&nbsp;·&nbsp;&nbsp;VERIFIED&nbsp;✓</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
              <div style={{ display: "flex", gap: 3, height: 50, alignItems: "stretch" }}>
                {BARCODE.map((w, i) => <span key={i} style={{ width: w, background: "#fff" }} />)}
              </div>
              <div style={{ fontSize: 18, letterSpacing: 3, color: "rgba(255,255,255,.65)" }}>share your brag →</div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* outro: Brag & earn credits */}
      {frame >= 358 && (
        <AbsoluteFill style={{ background: "rgba(20,8,24,.62)", opacity: outro, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", padding: "0 110px", transform: `translateY(${(1 - outro) * 40}px)` }}>
            <div style={{ fontSize: 90, lineHeight: 1 }}>🎁</div>
            <div style={{ fontFamily: DISP, fontSize: 76, fontWeight: 700, letterSpacing: "-1.5px", marginTop: 30 }}>Brag &amp; earn<br />Headout Credits</div>
            <div style={{ fontSize: 34, fontWeight: 500, color: "rgba(255,255,255,.85)", marginTop: 26, lineHeight: 1.4 }}>Share your receipt on socials and get rewarded — valid for 365 days, on any experience.</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginTop: 50 }}>
              <Logo size={64} />
              <span style={{ fontFamily: DISP, fontSize: 40, fontWeight: 600, letterSpacing: "-.5px" }}>headout</span>
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
