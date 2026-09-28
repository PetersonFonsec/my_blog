import Seo from "../components/Seo";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

const sections = [
  { id: "home", label: "00 / INÍCIO", title: <>Construo software.<br />Exploro ideias.<br /><span>Compartilho o processo.</span></>, description: "Um espaço para o que estudo, o que desenvolvo e as decisões pelo caminho.", cta: ["Explorar meus estudos", "/posts"], icon: "</>" },
  { id: "sobre", label: "01 / SOBRE MEU TRABALHO", title: <>Entender o todo.<br />Cuidar dos detalhes.</>, description: "Atuo como desenvolvedor full stack sênior no Santander, do planejamento e das discussões de arquitetura à implementação. Hoje, sou uma referência em frontend no meu time.", cta: ["Conhecer a minha atuação", "/sobre"], icon: "{ }" },
  { id: "estudos", label: "02 / DIÁRIO DE ESTUDOS", title: <>Da curiosidade<br />à prática.</>, description: "Fundamentos, experimentos e aprendizados construindo software. Primeiro a teoria; depois, um projeto para colocar as ideias à prova.", cta: ["Ver estudos e projetos", "/posts"], icon: "↗" },
];

function PixelWorld({ index }) {
  return (
    <div className={`pixel-world world-${index}`} aria-hidden="true">
      <div className="parallax skyline" data-speed="0.1">{Array.from({ length: 18 }, (_, item) => <i key={item} style={{ "--height": `${150 + ((item * 71 + index * 43) % 280)}px` }} />)}</div>
      <div className="parallax steel" data-speed="0.055" />
      <div className="parallax foreground" data-speed="-0.035"><i /><i /></div>
    </div>
  );
}

export default function Home() {
  const chromeRef = useRef(null);
  const mainRef = useRef(null);
  const travelerRef = useRef(null);
  const ropeRef = useRef(null);

  useEffect(() => {
    const chrome = chromeRef.current;
    const main = mainRef.current;
    const traveler = travelerRef.current;
    const rope = ropeRef.current;
    const sectionElements = [...main.querySelectorAll(".parallax-section")];
    const anchors = sectionElements.map((section) => section.querySelector(".scene-anchor"));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let points = [];
    let animationFrame = null;
    let needsUpdate = true;
    let lastFrameTime = 0;
    let currentPosition = null;
    let targetPosition = null;
    let disposed = false;

    const measureTarget = () => {
      const chromeHeight = `${Math.round(chrome.getBoundingClientRect().height)}px`;
      if (main.style.getPropertyValue("--home-chrome-height") !== chromeHeight) {
        main.style.setProperty("--home-chrome-height", chromeHeight);
      }
      const root = main.getBoundingClientRect();
      points = anchors.map((anchor) => {
        const rect = anchor.getBoundingClientRect();
        return { x: rect.left - root.left + rect.width * 0.5 - traveler.offsetWidth / 2, y: rect.bottom - root.top - traveler.offsetHeight - 34 };
      });
      sectionElements.forEach((section) => {
        const bounds = section.getBoundingClientRect();
        const offset = innerHeight / 2 - (bounds.top + bounds.height / 2);
        section.querySelectorAll(".parallax").forEach((layer) => { layer.style.transform = reduced.matches ? "none" : `translate3d(0, ${Math.round(offset * Number(layer.dataset.speed))}px, 0)`; });
      });
      if (!points.length || reduced.matches) {
        rope.hidden = true;
        return;
      }
      const rootTop = main.getBoundingClientRect().top + scrollY;
      const focus = scrollY + innerHeight * 0.55 - rootTop;
      let { x, y } = points[0];
      let frame = 0;
      for (let index = 0; index < points.length - 1; index += 1) {
        const from = points[index];
        const to = points[index + 1];
        const start = from.y + traveler.offsetHeight * 0.7 + 120;
        const end = to.y + traveler.offsetHeight * 0.35;
        if (focus >= start) {
          const progress = Math.max(0, Math.min(1, (focus - start) / (end - start)));
          const smooth = progress * progress * (3 - 2 * progress);
          x = from.x + (to.x - from.x) * smooth;
          y = from.y + (to.y - from.y) * smooth;
          frame = progress < 0.15 ? (index === 0 ? 0 : 1) : progress > 0.9 ? (index === 0 ? 1 : 3) : 2;
        }
      }

      // Once scroll snap settles a section at the top, finish the journey on
      // that platform instead of leaving the traveler in the climbing frame.
      const snappedIndex = sectionElements.findIndex((section) => Math.abs(section.getBoundingClientRect().top) <= innerHeight * 0.04);
      if (snappedIndex !== -1) {
        ({ x, y } = points[snappedIndex]);
        frame = [0, 1, 3][snappedIndex];
      }
      targetPosition = { x, y, frame };
      if (!currentPosition) currentPosition = { x, y };
      traveler.style.visibility = "visible";
    };

    const animate = (time) => {
      if (needsUpdate) {
        needsUpdate = false;
        measureTarget();
      }
      if (!targetPosition || !currentPosition) {
        animationFrame = null;
        return;
      }
      const elapsed = lastFrameTime ? Math.min(time - lastFrameTime, 64) : 16;
      lastFrameTime = time;
      const easing = 1 - Math.exp(-elapsed / 110);
      currentPosition.x += (targetPosition.x - currentPosition.x) * easing;
      currentPosition.y += (targetPosition.y - currentPosition.y) * easing;
      const x = Math.round(currentPosition.x * 10) / 10;
      const y = Math.round(currentPosition.y * 10) / 10;
      traveler.style.transform = `translate3d(${x}px,${y}px,0)`;
      traveler.style.backgroundPosition = `${(targetPosition.frame * 100) / 3}% 0`;
      // The raised hands in sprite frame 2 meet at 61% x / 10% y.
      // Keep the cable behind the sprite, ending inside the hands.
      rope.style.left = `${x + traveler.offsetWidth * 0.61}px`;
      rope.style.height = `${Math.max(0, y + traveler.offsetHeight * 0.1)}px`;
      rope.hidden = targetPosition.frame !== 2;

      const settled = Math.abs(targetPosition.x - currentPosition.x) < 0.1 && Math.abs(targetPosition.y - currentPosition.y) < 0.1;
      if (settled && !needsUpdate) {
        currentPosition = { x: targetPosition.x, y: targetPosition.y };
        animationFrame = null;
        lastFrameTime = 0;
        return;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    const schedule = () => {
      needsUpdate = true;
      if (animationFrame === null) animationFrame = requestAnimationFrame(animate);
    };
    // Fonts and grid layout can settle after the first effect (notably in Safari).
    // Keep the platform coordinates fresh, including after back/forward restoration.
    const observer = new ResizeObserver(schedule);
    observer.observe(chrome);
    observer.observe(main);
    anchors.forEach((anchor) => observer.observe(anchor));
    sectionElements.forEach((section) => observer.observe(section));
    observer.observe(traveler);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    addEventListener("pageshow", schedule);
    reduced.addEventListener("change", schedule);
    document.fonts.ready.then(() => { if (!disposed) schedule(); });
    schedule();
    return () => {
      disposed = true;
      observer.disconnect();
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      removeEventListener("pageshow", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <>
      <Seo title="Peterson Simião — Desenvolvedor full stack sênior" description="Desenvolvimento de software, estudos e projetos pessoais de Peterson Simião." />
      <div className="home-chrome" ref={chromeRef}>
        <SiteHeader />
        <div className="lab-strip">LABORATÓRIO PESSOAL / Explore, construa, compartilhe ↓</div>
      </div>
      <main className="home-main" ref={mainRef}>
        {sections.map((section, index) => (
          <section className="parallax-section" id={section.id} key={section.id}>
            <PixelWorld index={index} />
            <div className="section-copy">
              <span className="eyebrow">{section.label}</span>
              {index === 0 && <p>Olá, eu sou Peterson Simião.</p>}
              {index === 0 ? <h1>{section.title}</h1> : <h2>{section.title}</h2>}
              <p>{section.description}</p>
              {index === 1 && <div className="tags"><span>Frontend</span><span>Backend</span><span>Arquitetura</span></div>}
              <div className="actions"><Link className="button primary" href={section.cta[1]} data-ga-event="cta_click" data-ga-label={section.cta[0]} data-ga-location={`home_${section.id}`}>{section.cta[0]} ↗</Link>{index === 0 && <a className="button" href="#sobre" data-ga-event="cta_click" data-ga-label="Conhecer meu trabalho" data-ga-location="home_home">Conhecer meu trabalho ↓</a>}</div>
            </div>
            <div className="scene-anchor"><div className="station"><span>{section.icon}</span></div><small>0{index + 1} / {index === 0 ? "Toda jornada começa com uma ideia." : index === 1 ? "Uma nova perspectiva." : "Sempre há algo novo para aprender."}</small></div>
          </section>
        ))}
        <div className="traveler-rope" ref={ropeRef} hidden aria-hidden="true" />
        <div className="traveler" ref={travelerRef} role="img" aria-label="Peterson em pixel art acompanhando a navegação" />
      </main>
      <section className="contact" id="contato"><span className="eyebrow">03 / CONTATO</span><h2>Vamos trocar uma ideia?</h2><p>Sobre software, um projeto ou a próxima oportunidade.</p><div className="actions"><a className="button primary" href="https://www.linkedin.com/in/peterson-fonseca-759203174/" target="_blank" rel="noreferrer" data-ga-event="cta_click" data-ga-label="LinkedIn" data-ga-location="contato">LinkedIn ↗</a><a className="button" href="mailto:contato@petersonsimiao.com.br" data-ga-event="cta_click" data-ga-label="E-mail" data-ga-location="contato">E-mail ↗</a></div></section>
      <SiteFooter />
    </>
  );
}
