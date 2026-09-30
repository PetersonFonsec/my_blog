import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preload" href="/impatiently-waiting.png" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon/favicon.ico?v=pixel-3" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png?v=pixel-3" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png?v=pixel-3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png?v=pixel-3" />
        <link rel="manifest" href="/favicon/site.webmanifest?v=pixel-3" />
        <meta name="theme-color" content="#0d181e" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Peterson" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>
      <body><Main /><noscript><style>{`.preloader{display:none!important}`}</style></noscript><NextScript /></body>
    </Html>
  );
}
