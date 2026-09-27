import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { articles } from "../../data/articles";

export default function Posts() {
  const [filter, setFilter] = useState("todos");
  const visible = filter === "todos" ? articles : articles.filter((article) => article.type === filter);
  return <><Head><title>Estudos e projetos — Peterson Simião</title><meta name="description" content="Artigos sobre estudos e projetos pessoais de Peterson Simião." /></Head><SiteHeader /><main className="posts-main"><section className="posts-hero"><span className="eyebrow">ARQUIVO / ESTUDOS + PROJETOS</span><h1>O que estou aprendendo e construindo.</h1><p>Fundamentos, experimentos e decisões técnicas registrados do problema à prática.</p><div className="terminal" aria-hidden="true"><strong>PUBLICAÇÕES.EXE</strong><span>&gt; teoria + prática</span><span>&gt; projetos pessoais</span><span>&gt; em construção_</span></div></section><section className="archive"><div className="archive-head"><div><span className="eyebrow">TODAS AS PUBLICAÇÕES</span><h2>Diário de bordo.</h2></div><div className="filters" aria-label="Filtrar publicações">{[["todos","Todos"],["estudo","Estudos"],["projeto","Projetos"]].map(([value,label])=><button key={value} type="button" aria-pressed={filter===value} onClick={()=>setFilter(value)}>{label}</button>)}</div></div><div className="post-grid">{visible.map((article)=><Link className="post-card" href={`/posts/${article.slug}`} key={article.slug}><div><span>{article.category}</span><span>{article.readingTime}</span></div><h3>{article.title}</h3><p>{article.excerpt}</p><strong>LER ARTIGO ↗</strong></Link>)}</div></section></main><SiteFooter /></>;
}
