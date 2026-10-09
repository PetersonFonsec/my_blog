import Seo from "../../components/Seo";
import Link from "next/link";
import { useState } from "react";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { getBlog, articleSummary } from "../../services/blog";

const typeLabels = { post: "Post", estudo: "Estudo", projeto: "Projeto" };

export default function Posts({ articles }) {
  const [filter, setFilter] = useState("todos");
  const visible = filter === "todos" ? articles : articles.filter((article) => article.type === filter);
  return <><Seo title="Estudos e projetos — Peterson Simião" description="Artigos sobre estudos e projetos pessoais de Peterson Simião." path="/posts" /><SiteHeader /><main className="posts-main"><section className="posts-hero"><span className="eyebrow">ARQUIVO / ESTUDOS + PROJETOS</span><h1>O que estou aprendendo e construindo.</h1><p>Fundamentos, experimentos e decisões técnicas registrados do problema à prática.</p><div className="terminal" aria-hidden="true"><strong>PUBLICAÇÕES.EXE</strong><span>&gt; teoria + prática</span><span>&gt; projetos pessoais</span><span>&gt; em construção_</span></div></section><section className="archive"><div className="archive-head"><div><span className="eyebrow">TODAS AS PUBLICAÇÕES</span><h2>Diário de bordo.</h2></div><div className="filters" aria-label="Filtrar publicações">{[["todos","Todos"],["post","Posts"],["estudo","Estudos"],["projeto","Projetos"]].map(([value,label])=><button key={value} type="button" aria-pressed={filter===value} onClick={()=>setFilter(value)} data-ga-event="filter_posts" data-ga-label={label}>{label}</button>)}</div></div><div className="post-grid">{visible.map((article)=><Link prefetch={false} className={`post-card post-card--${article.type}`} href={`/posts/${article.slug}`} key={article.slug} data-ga-event="select_content" data-ga-content-type="post" data-ga-content-id={article.slug} data-ga-label={article.title} data-ga-location="lista_posts"><div><span><b className="post-type">{typeLabels[article.type]}</b>{article.category !== typeLabels[article.type] && article.category}</span><span>{article.readingTime}</span></div><h3>{article.title}</h3><p>{article.excerpt}</p><strong>LER ARTIGO ↗</strong></Link>)}</div></section></main><SiteFooter /></>;
}

export async function getStaticProps() {
  const articles = (await getBlog()).map(articleSummary);
  return { props: { articles } };
}
