import { staticFile, delayRender, continueRender } from "remotion";

// Load the local Halyard faces and hold the render until they're ready.
const FACES = [
  ["Halyard Display", "fonts/Halyard-Display-Bold.ttf", "700"],
  ["Halyard Display", "fonts/Halyard-Display-SemiBold.ttf", "600"],
  ["Halyard Display", "fonts/Halyard-Display-Medium.ttf", "500"],
  ["Halyard Text", "fonts/Halyard-Text-Regular.ttf", "400"],
  ["Halyard Text", "fonts/Halyard-Text-Medium.ttf", "500"],
];

const handle = delayRender("load-fonts");
Promise.all(
  FACES.map(([family, url, weight]) => {
    const ff = new FontFace(family, `url(${staticFile(url)})`, { weight });
    document.fonts.add(ff);
    return ff.load();
  })
)
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
