import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import BragReceipt from "./BragReceipt.jsx";
import PortalReceipt from "./PortalReceipt.jsx";
import { THEMES, THEME_ORDER, CARD_W, CARD_H } from "../data.js";

// Shared on social → redirects to the experience page.
const SHARE_URL =
  "https://www.headout.com/colosseum-tickets/priority-tickets-to-colosseum-roman-forum-palatine-hill-fast-track-entry-tickets-e-7148/?scrollTo=Highlights";
const MODAL_MAX = 560; // px — fixed modal width
const CREDIT = "X$"; // reward amount kept hidden for now

const ICONS = {
  whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  link: "M3.9 12a3.1 3.1 0 013.1-3.1h4V7h-4a5 5 0 000 10h4v-1.9h-4A3.1 3.1 0 013.9 12zM8 13h8v-2H8v2zm9-6h-4v1.9h4a3.1 3.1 0 010 6.2h-4V17h4a5 5 0 000-10z",
  download: "M11 3h2v8.17l3.59-3.58L18 9l-6 6-6-6 1.41-1.41L11 11.17V3zM5 18h14v2H5z",
};
const BrandIcon = ({ name, size = 25 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={ICONS[name]} /></svg>
);

const PORTAL_SHAPES = [
  ["arch", "Arch"],
  ["shield", "Shield"],
  ["octagon", "Octagon"],
];

export default function BragReceiptModal({ booking, onClose }) {
  const [themeId, setThemeId] = useState("twilight");
  const [style, setStyle] = useState("glow"); // glow | portal
  const [shape, setShape] = useState("arch");
  const [scale, setScale] = useState(0.3);
  const [toast, setToast] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const cardRef = useRef(null);
  const modalRef = useRef(null);
  const headRef = useRef(null);
  const footRef = useRef(null);
  const theme = THEMES[themeId];
  const receipt = booking.receipt;

  // Size the receipt to the exact space left after the header + toolbar, by
  // MEASURING them (not estimating). Guarantees the whole popup fits inside the
  // box on any screen — nothing spills outside. Re-runs when the footer changes
  // height (Glow ↔ Portals, wrapping on narrow screens).
  useLayoutEffect(() => {
    const fit = () => {
      const modalMaxH = Math.min(window.innerHeight * 0.95, window.innerHeight - 32);
      const modalInner = Math.min(window.innerWidth * 0.94, MODAL_MAX) - 60;
      const headH = headRef.current?.offsetHeight ?? 36;
      const footH = footRef.current?.offsetHeight ?? 90;
      const GAPS = 18 * 2; // .br-modal row gaps
      const PAD = 14 + 24; // .br-modal top + bottom padding
      const availH = modalMaxH - headH - footH - GAPS - PAD - 6;
      const s = Math.min(modalInner / CARD_W, availH / CARD_H);
      setScale(Math.max(0.12, Math.min(s, 0.5)));
    };
    fit();
    window.addEventListener("resize", fit);
    const ro = new ResizeObserver(fit);
    if (footRef.current) ro.observe(footRef.current);
    return () => {
      window.removeEventListener("resize", fit);
      ro.disconnect();
    };
  }, [style, shape]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (infoOpen) setInfoOpen(false);
      else onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, infoOpen]);

  const flash = (msg) => {
    setToast(msg);
    window.clearTimeout(flash._t);
    flash._t = window.setTimeout(() => setToast(""), 2200);
  };

  const caption = `I unlocked “${receipt.achievement}” on Headout ✦ ` + receipt.titleLines.join(" ");
  const makePng = () => toPng(cardRef.current, { width: CARD_W, height: CARD_H, pixelRatio: 2, cacheBust: true });

  async function download() {
    const url = await makePng();
    const a = document.createElement("a");
    a.download = `brag-receipt-${booking.id}-${style}-${theme.id}.png`;
    a.href = url;
    a.click();
    flash("Image saved");
  }

  // Share the PNG of the CURRENTLY SELECTED variant (cardRef = active receipt)
  // plus the caption + experience link, via the native share sheet. On mobile
  // this lets the user pick WhatsApp/Instagram with the image attached.
  async function shareImage({ fallbackUrl, fallbackLabel }) {
    try {
      const url = await makePng();
      const blob = await (await fetch(url)).blob();
      const file = new File([blob], `brag-receipt-${booking.id}-${style}.png`, { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: `${caption}\n${SHARE_URL}` });
        return;
      }
    } catch (e) {
      if (e?.name === "AbortError") return;
    }
    // Fallback (e.g. desktop without file-share support)
    if (fallbackUrl) openIntent(fallbackUrl);
    else { await download(); flash(`Image saved — share it on ${fallbackLabel}`); }
  }

  const openIntent = (url) => window.open(url, "_blank", "noopener,noreferrer");
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${caption} ${SHARE_URL}`);
      flash("Link copied to clipboard");
    } catch {
      flash("Couldn’t copy — try again");
    }
  }

  const enc = encodeURIComponent;

  // WhatsApp: attach the selected variant's PNG. Mobile → native share sheet
  // (WhatsApp appears with the image). Desktop → save the PNG + open WhatsApp
  // (web can't auto-attach a file to WhatsApp), so the user drops it in.
  async function whatsappShare() {
    const text = `${caption}\n${SHARE_URL}`;
    let dataUrl;
    try { dataUrl = await makePng(); } catch { /* ignore */ }
    try {
      if (dataUrl && navigator.canShare) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `brag-receipt-${booking.id}-${style}.png`, { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], text });
          return;
        }
      }
    } catch (e) {
      if (e?.name === "AbortError") return;
    }
    if (dataUrl) {
      const a = document.createElement("a");
      a.download = `brag-receipt-${booking.id}-${style}.png`;
      a.href = dataUrl;
      a.click();
    }
    flash("Receipt saved — attach it in the WhatsApp chat");
    setTimeout(() => openIntent(`https://wa.me/?text=${enc(text)}`), 500);
  }

  const SHARES = [
    { name: "whatsapp", label: "WhatsApp", bg: "#25D366", onClick: whatsappShare },
    { name: "instagram", label: "Instagram", bg: "#E1306C", onClick: () => shareImage({ fallbackLabel: "Instagram" }) },
    { name: "x", label: "X", bg: "#000000", onClick: () => openIntent(`https://twitter.com/intent/tweet?text=${enc(caption)}&url=${enc(SHARE_URL)}`) },
    { name: "facebook", label: "Facebook", bg: "#1877F2", onClick: () => openIntent(`https://www.facebook.com/sharer/sharer.php?u=${enc(SHARE_URL)}`) },
    { name: "link", label: "Copy link", bg: "#6B7280", onClick: copyLink },
    { name: "download", label: "Save PNG", bg: "var(--purple)", onClick: download },
  ];

  return (
    <div className="br-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="br-modal" ref={modalRef} role="dialog" aria-modal="true" aria-label="Brag Receipt">
        {/* Tabs row + promo banner (measured together for the fit calc) */}
        <div className="br-top" ref={headRef}>
          <div className="br-head">
            <div className="br-tabs">
              <button className={style === "glow" ? "on" : ""} onClick={() => setStyle("glow")}>Glow</button>
              <button className={style === "portal" ? "on" : ""} onClick={() => setStyle("portal")}>Portals</button>
            </div>
            <button className="br-x" onClick={onClose} aria-label="Close">×</button>
          </div>
          <div className="br-banner" role="button" tabIndex={0} onClick={() => setInfoOpen(true)}
               onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setInfoOpen(true)}>
            {/* gloss + shimmer live in a clipped layer so artifacts can overhang */}
            <span className="bn-clip" />
            {/* artifacts — different sizes, overhanging the banner edges */}
            <span className="bn-art" style={{ left: "6px", top: "-10px", fontSize: "27px", transform: "rotate(-18deg)" }}>🎟️</span>
            <span className="bn-art" style={{ left: "48px", bottom: "-8px", fontSize: "16px", transform: "rotate(12deg)" }}>🪙</span>
            <span className="bn-art" style={{ left: "86px", top: "4px", fontSize: "13px", opacity: 0.9 }}>✨</span>
            <span className="bn-text"><span className="gift">🎁</span> Brag the receipt &amp; unlock surprises <span className="bn-chev">›</span></span>
            <span className="bn-art" style={{ right: "8px", top: "-11px", fontSize: "25px", transform: "rotate(17deg)" }}>🪙</span>
            <span className="bn-art" style={{ right: "48px", bottom: "-9px", fontSize: "18px", transform: "rotate(-14deg)" }}>🎟️</span>
            <span className="bn-art" style={{ right: "84px", top: "-6px", fontSize: "23px" }}>✨</span>
          </div>
        </div>

        {/* Preview */}
        <div className="br-preview" style={{ width: CARD_W * scale, height: CARD_H * scale }}>
          <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
            {style === "portal" ? (
              <PortalReceipt ref={cardRef} receipt={receipt} theme={theme} shape={shape} />
            ) : (
              <BragReceipt ref={cardRef} receipt={receipt} theme={theme} />
            )}
          </div>
        </div>

        {/* Footer — gradient thumbnails stacked ABOVE the share buttons
            (identical layout in Glow and Portal states for uniformity) */}
        <div className="br-foot" ref={footRef}>
          {style === "portal" && (
            <div className="br-pills">
              {PORTAL_SHAPES.map(([id, lbl]) => (
                <button key={id} className={shape === id ? "on" : ""} onClick={() => setShape(id)}>{lbl}</button>
              ))}
            </div>
          )}

          {/* Gradient thumbnails — Glow state only (themes don't apply the same
              way in the photo-based Portal state) */}
          {style === "glow" && (
            <div className="br-swatches">
              {THEME_ORDER.map((id) => (
                <button key={id} className={"br-swatch" + (id === themeId ? " active" : "")} style={{ background: THEMES[id].background }} onClick={() => setThemeId(id)} aria-label={THEMES[id].name} title={THEMES[id].name} />
              ))}
            </div>
          )}

          <div className="br-share icons-only">
            {SHARES.map((s) => (
              <button key={s.name} className="br-share-item" onClick={s.onClick} title={s.label} aria-label={s.label}>
                <span className="br-ico" style={{ background: s.bg }}><BrandIcon name={s.name} size={22} /></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* "How it works" info card — opened from the banner */}
      {infoOpen && (
        <div className="info-overlay" onMouseDown={(e) => e.target === e.currentTarget && setInfoOpen(false)}>
          <div className="info-card" role="dialog" aria-modal="true" aria-label="How it works">
            <div className="info-header">
              {/* artifacts kept in the empty top band, framing the gift (off the text) */}
              <span className="info-art" style={{ left: "16px", top: "-4px", fontSize: "33px", transform: "rotate(-16deg)" }}>🎟️</span>
              <span className="info-art" style={{ left: "86px", top: "22px", fontSize: "24px", transform: "rotate(11deg)" }}>🪙</span>
              <span className="info-art" style={{ left: "140px", top: "4px", fontSize: "16px" }}>✨</span>
              <span className="info-art" style={{ right: "64px", top: "6px", fontSize: "31px", transform: "rotate(15deg)" }}>🪙</span>
              <span className="info-art" style={{ right: "16px", top: "54px", fontSize: "25px", transform: "rotate(12deg)" }}>🎟️</span>
              <span className="info-art" style={{ right: "118px", top: "30px", fontSize: "16px" }}>✨</span>
              <button className="info-x" onClick={() => setInfoOpen(false)} aria-label="Close">×</button>
              <div className="info-emoji">🎁</div>
              <h3>Brag &amp; earn Headout Credits</h3>
              <p>Share your moment — we’ll reward you for it.</p>
            </div>
            <div className="info-body">
              <ol className="info-steps">
                <li><span className="step-n">1</span><div><b>Share your Brag Receipt</b><span>Post it to WhatsApp, Instagram, X or Facebook.</span></div></li>
                <li><span className="step-n">2</span><div><b>Get {CREDIT} in Headout Credits</b><span>Added to your account the moment you share.</span></div></li>
                <li><span className="step-n">3</span><div><b>Valid for 365 days</b><span>Yes! The credits have a validity of 365 days so no rush, use them whenever you want to.</span></div></li>
                <li><span className="step-n">4</span><div><b>Use on any experience</b><span>Redeem on anything you book on Headout.</span></div></li>
              </ol>
              <button className="info-cta" onClick={() => setInfoOpen(false)}>Got it</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="br-toast">{toast}</div>}
    </div>
  );
}
