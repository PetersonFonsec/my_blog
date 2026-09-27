import Head from "next/head";

const origin = "https://petersonsimiao.com.br";
const image = `${origin}/images/og-peterson-pixel-v2.png`;
const imageAlt = "Peterson Simião em pixel art. Construo software. Exploro ideias. Compartilho o processo.";

export default function Seo({ title, description, path = "/", type = "website" }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <link rel="canonical" href={`${origin}${path}`} key="canonical" />
      <meta property="og:site_name" content="Peterson Simião" key="og:site_name" />
      <meta property="og:locale" content="pt_BR" key="og:locale" />
      <meta property="og:type" content={type} key="og:type" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:url" content={`${origin}${path}`} key="og:url" />
      <meta property="og:image" content={image} key="og:image" />
      <meta property="og:image:width" content="1200" key="og:image:width" />
      <meta property="og:image:height" content="630" key="og:image:height" />
      <meta property="og:image:type" content="image/png" key="og:image:type" />
      <meta property="og:image:alt" content={imageAlt} key="og:image:alt" />
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
      <meta name="twitter:image" content={image} key="twitter:image" />
      <meta name="twitter:image:alt" content={imageAlt} key="twitter:image:alt" />
    </Head>
  );
}
