import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">peterson<span>_</span></Link>
      <nav aria-label="Navegação principal">
        <Link href="/#sobre">Sobre</Link>
        <Link href="/posts">Publicações</Link>
        <Link href="/#contato">Contato</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return <footer className="site-footer"><strong>peterson<span>_</span></strong><small>Construindo, aprendendo e compartilhando.</small></footer>;
}
