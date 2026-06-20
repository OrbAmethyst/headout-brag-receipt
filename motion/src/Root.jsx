import { Composition } from "remotion";
import { BragPromo } from "./BragPromo.jsx";
import "./fonts.js";

export const RemotionRoot = () => (
  <Composition
    id="BragPromo"
    component={BragPromo}
    durationInFrames={420}
    fps={30}
    width={1080}
    height={1920}
  />
);
