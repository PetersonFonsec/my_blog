import { SPRITE_URL } from "./usePreloader";
import { getSpriteStyle } from "./frames";

export default function Preloader({ frame, phase, visible }) {
  if (!visible) return null;
  return (
    <div className={`preloader${phase === "exiting" ? " preloader--exiting" : ""}`}>
      <div className="preloader__mascot" aria-hidden="true">
        <div className="preloader__stage">
          <div className="preloader__sprite" style={{
            ...getSpriteStyle(frame),
            backgroundImage: `url("${SPRITE_URL}")`,
          }} />
        </div>
      </div>
      <p className="preloader__label" role="status" aria-live="polite" aria-atomic="true">
        <span className="preloader__accessible">Carregando...</span>
        <span aria-hidden="true">Carregando<span className="preloader__dots">...</span></span>
      </p>
    </div>
  );
}
