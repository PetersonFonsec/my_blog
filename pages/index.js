import Head from "next/head";

import SectionProfile from "../components/Layouts/Sections/Profile";
import SectionSkills from "../components/Layouts/Sections/Skills";
import SectionProjects from "../components/Layouts/Sections/Projects";
import AsideComponent from "../components/Layouts/Aside";

function Home() {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Olá, meu nome é Peterson e sou um desenvolvedor front-end"
        />

        <title>Peterson - Front end</title>

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://petersonsimiao.com.br/" />
        <meta property="og:title" content="Olá, meu nome é Peterson" />
        <meta
          property="og:description"
          content="Olá, meu nome é Peterson e sou um desenvolvedor front-end"
        />
        {/* <meta property="og:image" content="/assets/images/share.png" /> */}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://petersonsimiao.com.br/" />
        <meta property="twitter:title" content="Olá, meu nome é Peterson" />
        <meta
          property="twitter:description"
          content="Olá, meu nome é Peterson e sou um desenvolvedor front-end"
        />

        {/* <meta property="twitter:image" content="/assets/images/share.png" /> */}
        <link rel="canonical" href="https://petersonsimiao.com.br/" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Nunito:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <AsideComponent>
          <SectionProfile />
          <SectionSkills />
        </AsideComponent>
        <SectionProjects />
      </main>
    </>
  );
}

export default Home;
