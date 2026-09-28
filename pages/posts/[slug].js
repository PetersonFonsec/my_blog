import Seo from "../../components/Seo";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { getBlog, articleSummary } from "../../services/blog";

export default function ArticlePage({ article, nextArticle }) {
  return (
    <>
      <Seo title={`${article.title} — Peterson Simião`} description={article.excerpt} path={`/posts/${article.slug}`} type="article" />
      <SiteHeader />
      <main className="article-main">
        <header className="article-hero">
          <span className="eyebrow">{article.category}</span>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <div><span>{article.readingTime}</span><span>LABORATÓRIO PESSOAL</span></div>
        </header>
        <div className="article-layout">
          <aside><strong>PUBLICAÇÃO</strong><Link prefetch={false} href="/posts">← Todas as publicações</Link></aside>
          <article>
            <div className="cms-content" dangerouslySetInnerHTML={{ __html: article.html }} />
            {article.reference && <p><a href={article.reference} target="_blank" rel="noreferrer">Referência ↗</a></p>}
            {nextArticle && <Link prefetch={false} className="next-article" href={`/posts/${nextArticle.slug}`} data-ga-event="select_content" data-ga-content-type="post" data-ga-content-id={nextArticle.slug} data-ga-label={nextArticle.title} data-ga-location="proxima_leitura"><small>PRÓXIMA LEITURA →</small><strong>{nextArticle.title}</strong></Link>}
            <Link prefetch={false} className="back-link" href="/posts">← Voltar para todas as publicações</Link>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export async function getStaticPaths() {
  const articles = await getBlog();
  return { paths: articles.map(({ slug }) => ({ params: { slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const articles = await getBlog();
  const index = articles.findIndex(({ slug }) => slug === params.slug);
  if (index === -1) return { notFound: true };
  return {
    props: {
      article: articles[index],
      nextArticle: articles.length > 1 ? articleSummary(articles[(index + 1) % articles.length]) : null,
    },
  };
}
