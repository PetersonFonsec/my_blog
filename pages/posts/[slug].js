import Seo from "../../components/Seo";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { articles, getArticle } from "../../data/articles";

export default function ArticlePage({ article, nextArticle }) {
  return <><Seo title={`${article.title} — Peterson Simião`} description={article.excerpt} path={`/posts/${article.slug}`} type="article" /><SiteHeader /><main className="article-main"><header className="article-hero"><span className="eyebrow">{article.category}</span><h1>{article.title}</h1><p>{article.excerpt}</p><div><span>{article.readingTime}</span><span>LABORATÓRIO PESSOAL</span></div></header><div className="article-layout"><aside><strong>NESTE ARTIGO</strong>{article.sections.map((section,index)=><a href={`#secao-${index+1}`} key={section.title}>{String(index+1).padStart(2,"0")} / {section.title}</a>)}</aside><article>{article.sections.map((section,index)=><section id={`secao-${index+1}`} key={section.title}><h2>{section.title}</h2>{section.body.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}{section.code&&<pre><code>{section.code}</code></pre>}</section>)}<Link className="next-article" href={`/posts/${nextArticle.slug}`}><small>PRÓXIMA LEITURA →</small><strong>{nextArticle.title}</strong></Link><Link className="back-link" href="/posts">← Voltar para todas as publicações</Link></article></div></main><SiteFooter /></>;
}

export function getStaticPaths(){return{paths:articles.map(({slug})=>({params:{slug}})),fallback:false}}
export function getStaticProps({params}){const article=getArticle(params.slug);const index=articles.findIndex(({slug})=>slug===params.slug);return{props:{article,nextArticle:articles[(index+1)%articles.length]}}}
