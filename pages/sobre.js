import Link from "next/link";
import Seo from "../components/Seo";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { about } from "../data/about";

export default function Sobre() {
  return (
    <>
      <Seo title="Sobre mim — Peterson Simião" description="Conheça minha atuação como desenvolvedor full stack sênior, minha forma de trabalhar e meus estudos." path="/sobre" />
      <SiteHeader />
      <main>
        <section className="article-hero about-hero">
          <span className="eyebrow">01 / SOBRE MIM</span>
          <h1>Prazer, Peterson<span>_</span></h1>
          <p>{about.introduction}</p>
          <div className="tags"><span>Frontend</span><span>Backend</span><span>Arquitetura</span></div>
          <div className="actions">
            {about.resumeUrl ? (
              <a className="button primary" href={about.resumeUrl} download="Curriculo-Peterson-Simiao.pdf">Baixar meu currículo ↓</a>
            ) : (
              <button className="button primary" type="button" disabled aria-describedby="resume-status">Baixar meu currículo ↓</button>
            )}
            <Link className="button" href="/#contato">Vamos conversar ↗</Link>
          </div>
          {!about.resumeUrl && <p className="resume-status" id="resume-status">Currículo em breve disponível para download.</p>}
        </section>
        <div className="article-layout about-layout">
          <aside aria-label="Nesta página">
            <strong>UM POUCO SOBRE MIM</strong>
            {about.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
          </aside>
          <article>
            {about.sections.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
            <Link className="next-article" href="/posts"><small>DIÁRIO DE ESTUDOS</small><strong>Acompanhe o que estou construindo ↗</strong></Link>
            <Link className="back-link" href="/">← Voltar ao início</Link>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
