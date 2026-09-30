import { useEffect, useRef, useState } from "react";

export const FRAME_DURATIONS = [250, 200, 100, 150, 250, 120, 100, 150, 250, 150, 200, 100, 120, 150, 300, 200];
export const FADE_DURATION = 250;
export const SPRITE_URL = "/impatiently-waiting.png";

export default function usePreloader(loading) {
  const [frame, setFrame] = useState(0);
  const [phase, setPhase] = useState("playing");
  const [reducedMotion, setReducedMotion] = useState(true);
  const [imageReady, setImageReady] = useState(false);
  const loadingRef = useRef(loading);

  useEffect(() => { loadingRef.current = loading; }, [loading]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    const image = new Image();
    // An asset failure must not prevent the application from becoming usable.
    image.onload = image.onerror = () => setImageReady(true);
    image.src = SPRITE_URL;
    return () => {
      media.removeEventListener("change", update);
      image.onload = image.onerror = null;
    };
  }, []);

  useEffect(() => {
    if (loading) setPhase("playing");
  }, [loading]);

  useEffect(() => {
    if (phase !== "playing" || !imageReady) return undefined;
    let timer;
    let current = 0;
    setFrame(0);
    const next = () => {
      if (!loadingRef.current) {
        setPhase("exiting");
        return;
      }
      if (!reducedMotion) {
        current = (current + 1) % FRAME_DURATIONS.length;
        setFrame(current);
      }
      timer = window.setTimeout(next, FRAME_DURATIONS[current]);
    };
    timer = window.setTimeout(next, FRAME_DURATIONS[0]);
    return () => window.clearTimeout(timer);
  }, [phase, imageReady, reducedMotion]);

  useEffect(() => {
    if (phase !== "exiting") return undefined;
    const timer = window.setTimeout(() => setPhase("hidden"), FADE_DURATION);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return { frame, phase, visible: loading || phase !== "hidden" };
}
