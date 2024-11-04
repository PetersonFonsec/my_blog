import Document from "next/document";
import { GoogleAnalytics } from '@next/third-parties/google'

import { ServerStyleSheet } from "styled-components";

import Head from "next/head";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <>
                <Head>
                  <meta charSet="utf-8" />
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                  />
                  <meta name="theme-color" content="#000000" />
                  <meta
                    name="description"
                    content="Olá, meu nome é Peterson e sou um desenvolvedor front-end"
                  />

                  <title>Peterson - Front end</title>

                  {/* Favicon */}
                  <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/favicon/apple-touch-icon.png"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon/favicon-32x32.png"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon/favicon-16x16.png"
                  />
                  <link rel="manifest" href="/favicon/site.webmanifest" />
                  <link
                    rel="mask-icon"
                    href="/favicon/safari-pinned-tab.svg"
                    color="#5bbad5"
                  />
                  <meta name="msapplication-TileColor" content="#da532c" />
                  <meta name="theme-color" content="#ffffff" />

                  {/* Open Graph / Facebook */}
                  <meta property="og:type" content="website" />
                  <meta
                    property="og:url"
                    content="https://petersonsimiao.com.br/"
                  />
                  <meta
                    property="og:title"
                    content="Olá, meu nome é Peterson"
                  />
                  <meta property="og:image" content="/share.png" />
                  <meta property="og:image:type" content="image/png" />
                  <meta property="og:image:width" content="1200" />
                  <meta property="og:image:height" content="800" />
                  <meta
                    property="og:description"
                    content="Olá, meu nome é Peterson e sou um desenvolvedor front-end"
                  />

                  {/* Twitter */}
                  <meta property="twitter:card" content="summary_large_image" />
                  <meta property="twitter:image" content="/share.png" />
                  <meta
                    property="twitter:title"
                    content="Olá, meu nome é Peterson"
                  />
                  <meta
                    property="twitter:url"
                    content="https://petersonsimiao.com.br/"
                  />
                  <meta
                    property="twitter:description"
                    content="Olá, meu nome é Peterson e sou um desenvolvedor front-end"
                  />

                  {/* fonts */}
                  <link rel="canonical" href="https://petersonsimiao.com.br/" />
                  <link rel="preconnect" href="https://fonts.gstatic.com" />
                  <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Nunito:wght@700&display=swap"
                    rel="stylesheet"
                  />
                </Head>
                <GoogleAnalytics gtmId={process.env.ANALYTICS_PUBLIC_MEASUREMENT_ID} />
                <App {...props} />
              </>
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
