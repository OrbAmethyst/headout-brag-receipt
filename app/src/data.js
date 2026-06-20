// ============================================================================
//  Brag Receipt — design tokens & data (from README.md + Glow.dc.html reference)
// ============================================================================

// Canvas — the handoff's original Instagram Story format: 1080 × 1920 (9:16).
// Exports at 2× → 2160 × 3840. The receipt scales its type/spacing by
// `CARD_H / DESIGN_H`; since the handoff type was authored for 1920, DESIGN_H
// is 1920 and the layout renders 1:1. Change CARD_H and it re-fits automatically.
export const CARD_W = 1080;
export const CARD_H = 1920;
export const DESIGN_H = 1920; // height at which the handoff type scale renders 1:1

// Four interchangeable gradient themes. One identical layout — only palette
// tokens change. Values transcribed exactly from the reference prototype.
export const THEMES = {
  twilight: {
    id: "twilight",
    name: "Twilight Tides",
    background:
      "linear-gradient(168deg,#150a2c 0%,#221152 44%,#3a17a0 78%,#4E00C9 100%)",
    cornerAccents:
      "radial-gradient(120% 70% at 18% 6%, rgba(172,104,242,.5) 0%, transparent 50%),radial-gradient(120% 80% at 96% 92%, rgba(78,0,201,.6) 0%, transparent 52%)",
    orbs: ["#F4C7E6", "#C98BF0", "#EBA6FF"],
    halo: "rgba(172,104,242,.85)",
    swatch: "#AC68F2",
    badge: "linear-gradient(150deg,#E7B8FF 0%,#9B45F0 52%,#4E00C9 100%)",
    accent: "#EFC3FF",
  },
  deepspace: {
    id: "deepspace",
    name: "Deep Space",
    background:
      "linear-gradient(165deg,#0A2353 0%,#112C71 42%,#3b3aa8 76%,#5B58EB 100%)",
    cornerAccents:
      "radial-gradient(110% 70% at 88% 8%, rgba(86,225,233,.45) 0%, transparent 48%),radial-gradient(120% 80% at 6% 94%, rgba(187,99,255,.5) 0%, transparent 52%)",
    orbs: ["#56E1E9", "#5B58EB", "#BB63FF"],
    halo: "rgba(91,88,235,.85)",
    swatch: "#5B58EB",
    badge: "linear-gradient(150deg,#7FEAF1 0%,#5B58EB 56%,#2E2B9E 100%)",
    accent: "#9CEEF5",
  },
  aurora: {
    id: "aurora",
    name: "Aurora Blossom",
    background:
      "linear-gradient(170deg,#193153 0%,#0B5777 38%,#7a5b9e 74%,#EB96FF 100%)",
    cornerAccents:
      "radial-gradient(110% 60% at 16% 6%, rgba(11,87,119,.6) 0%, transparent 48%),radial-gradient(130% 80% at 90% 96%, rgba(249,212,224,.55) 0%, transparent 52%)",
    orbs: ["#F9D4E0", "#EB96FF", "#F9D4E0"],
    halo: "rgba(235,150,255,.85)",
    swatch: "#EB96FF",
    badge: "linear-gradient(150deg,#FBC0E6 0%,#E574FF 50%,#7A3FB0 100%)",
    accent: "#FBD1EE",
  },
  emerald: {
    id: "emerald",
    name: "Emerald",
    background: "linear-gradient(172deg,#060B0A 0%,#04261c 46%,#016b40 100%)",
    cornerAccents:
      "radial-gradient(110% 70% at 84% 6%, rgba(43,255,248,.4) 0%, transparent 48%),radial-gradient(120% 80% at 8% 96%, rgba(0,115,66,.6) 0%, transparent 52%)",
    orbs: ["#2BFFF8", "#B0FCCE", "#15c98a"],
    halo: "rgba(43,255,248,.8)",
    swatch: "#15c98a",
    badge: "linear-gradient(150deg,#7BFFF2 0%,#15C98A 55%,#016B40 100%)",
    accent: "#9CFCD8",
  },
};

export const THEME_ORDER = ["twilight", "deepspace", "aurora", "emerald"];

// 15-bar barcode pattern (px widths) from the reference.
export const BARCODE = [3, 6, 2, 8, 3, 2, 7, 3, 5, 2, 8, 3, 6, 2, 4];

// The canonical Brag Receipt content described in README.md — the
// "History Buff / Colosseum" achievement card. Fully prop-driven so the same
// component can be fed any completed booking's data.
export const COLOSSEUM_RECEIPT = {
  receiptNo: "№ 4417-RM",
  achievement: "History Buff",
  titleLines: ["Colosseum", "Underground", "& Arena Floor"],
  location: "Rome, Italy",
  photo: "/assets/colosseum.jpg", // used by the Portals receipt style
  stats: [
    { value: "4.5", unit: "hrs", label: "underground" },
    { value: "1,973", unit: "yrs", label: "of history walked" },
    { value: "547", unit: "", label: "stairs climbed" },
    { value: "Top 3%", unit: "", label: "explorer this month", nowrap: true },
  ],
  moment: "“Stood on the arena floor where gladiators once waited.”",
};

// Bookings shown on the "My bookings → Completed" page (matches the screenshot).
export const BOOKINGS = [
  {
    id: "31682962",
    title:
      "Colosseum Underground & Arena Floor: Fast-Track Entry + Audio Guide",
    image: "/assets/colosseum.jpg",
    price: "$0",
    date: "19 May 2026, 12:45pm",
    badge: "Ticket with audio guide",
    status: "completed",
    rateable: true,
    // The Brag Receipt this booking unlocks. Mirrors the README layout exactly,
    // with the canonical content from the handoff.
    receipt: COLOSSEUM_RECEIPT,
  },
  {
    id: "32010686",
    title: "Uffizi Gallery Timed Entry Tickets: Tickets + Digital Guidebook",
    image: "/assets/uffizi.jpg",
    price: "$0",
    date: "09 Jun 2026, 12:00pm",
    badge: null,
    status: "cancelled",
  },
];
