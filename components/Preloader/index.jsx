import { useEffect, useState } from "react";

const STORAGE_KEY = "mascot-preloader-seen";

// The whole 3s scene runs in CSS so it paints before hydration; JS only handles skip and cleanup.
export default function Preloader() {
  const [state, setState] = useState("playing");

  useEffect(() => {
    // The inline script in _document flags returning visits before paint; reading the class keeps this idempotent.
    if (document.documentElement.classList.contains("preloader-seen")) return setState("gone");
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }, []);

  if (state === "gone") return null;

  const skip = () => setState("skipped");
  const finish = (event) => {
    if (event.target === event.currentTarget) setState("gone");
  };

  return (
    <div
      className={`preloader${state === "skipped" ? " is-skipped" : ""}`}
      role="status"
      aria-label="Carregando o site"
      onClick={skip}
      onAnimationEnd={finish}
      onTransitionEnd={finish}
    >
      <div className="preloader-stage" aria-hidden="true">
        <div className="preloader-walker">
          <span className="preloader-bubble preloader-bubble-hi">Oi! Bem-vindo(a)!</span>
          <span className="preloader-bubble preloader-bubble-go">Bora!</span>
          <div className="preloader-hero" />
        </div>
        <div className="preloader-floor" />
      </div>
      <div className="preloader-bar" aria-hidden="true"><i /></div>
      <small className="preloader-hint">clique para pular</small>
    </div>
  );
}
