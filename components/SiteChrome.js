import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">peterson<span>_</span></Link>
      <nav aria-label="Navegação principal">
        <Link href="/sobre" data-ga-event="cta_click" data-ga-label="Sobre" data-ga-location="header">Sobre</Link>
        <Link href="/posts" data-ga-event="cta_click" data-ga-label="Publicações" data-ga-location="header">Publicações</Link>
        <Link href="/#contato" data-ga-event="cta_click" data-ga-label="Contato" data-ga-location="header">Contato</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return <footer className="site-footer"><strong>peterson<span>_</span></strong><small>Construindo, aprendendo e compartilhando.</small></footer>;
}
