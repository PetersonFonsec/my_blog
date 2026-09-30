import Head from "next/head";
import Link from "next/link";
import Seo from "../components/Seo";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export default function Offline() {
  return (
    <>
      <Seo title="Sem conexão — Peterson Simião" description="Você está offline. As páginas que já visitou continuam disponíveis." path="/offline" />
      <Head><meta name="robots" content="noindex" /></Head>
      <SiteHeader />
      <main>
        <section className="article-hero">
          <span className="eyebrow">ERRO / SEM CONEXÃO</span>
          <h1>Você está offline.</h1>
          <p>Não consegui carregar esta página agora. As páginas que você já visitou continuam disponíveis; tente de novo quando a conexão voltar.</p>
          <div className="actions">
            <Link className="button primary" href="/">Voltar ao início</Link>
            <Link className="button" href="/posts">Ver estudos salvos</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
