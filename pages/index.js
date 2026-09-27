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
  const mainRef = useRef(null);
  const travelerRef = useRef(null);
  const ropeRef = useRef(null);

  useEffect(() => {
    const main = mainRef.current;
    const traveler = travelerRef.current;
    const rope = ropeRef.current;
    const anchors = [...main.querySelectorAll(".scene-anchor")];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let points = [];
    let queued = false;

    const measure = () => {
      const root = main.getBoundingClientRect();
      points = anchors.map((anchor) => {
        const rect = anchor.getBoundingClientRect();
        return { x: rect.left - root.left + rect.width * 0.5 - traveler.offsetWidth / 2, y: rect.bottom - root.top - traveler.offsetHeight - 34 };
      });
      update();
    };

    const update = () => {
      queued = false;
      document.querySelectorAll(".parallax-section").forEach((section) => {
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
      traveler.style.transform = `translate3d(${Math.round(x)}px,${Math.round(y)}px,0)`;
      traveler.style.backgroundPosition = `${(frame * 100) / 3}% 0`;
      // The raised hands in sprite frame 2 meet at 61% x / 10% y.
      // Keep the cable behind the sprite, ending inside the hands.
      rope.style.left = `${Math.round(x) + traveler.offsetWidth * 0.61}px`;
      rope.style.height = `${Math.max(0, Math.round(y) + traveler.offsetHeight * 0.1)}px`;
      rope.hidden = frame !== 2;
    };

    const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", measure);
    reduced.addEventListener("change", measure);
    measure();
    return () => { removeEventListener("scroll", schedule); removeEventListener("resize", measure); reduced.removeEventListener("change", measure); };
  }, []);

  return (
    <>
      <Seo title="Peterson Simião — Desenvolvedor full stack sênior" description="Desenvolvimento de software, estudos e projetos pessoais de Peterson Simião." />
      <SiteHeader />
      <div className="lab-strip">LABORATÓRIO PESSOAL / Explore, construa, compartilhe ↓</div>
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
              <div className="actions"><Link className="button primary" href={section.cta[1]}>{section.cta[0]} ↗</Link>{index === 0 && <a className="button" href="#sobre">Conhecer meu trabalho ↓</a>}</div>
            </div>
            <div className="scene-anchor"><div className="station"><span>{section.icon}</span></div><small>0{index + 1} / {index === 0 ? "Toda jornada começa com uma ideia." : index === 1 ? "Uma nova perspectiva." : "Sempre há algo novo para aprender."}</small></div>
          </section>
        ))}
        <div className="traveler-rope" ref={ropeRef} hidden aria-hidden="true" />
        <div className="traveler" ref={travelerRef} role="img" aria-label="Peterson em pixel art acompanhando a navegação" />
      </main>
      <section className="contact" id="contato"><span className="eyebrow">03 / CONTATO</span><h2>Vamos trocar uma ideia?</h2><p>Sobre software, um projeto ou a próxima oportunidade.</p><div className="actions"><a className="button primary" href="https://www.linkedin.com/in/peterson-fonseca-759203174/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="button" href="mailto:contato@petersonsimiao.com.br">E-mail ↗</a></div></section>
      <SiteFooter />
    </>
  );
}
