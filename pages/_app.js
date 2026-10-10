import { useEffect } from "react";
import Head from "next/head";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { handleTrackedClick } from "../lib/analytics";
import "../styles/site.css";
import Preloader from "../components/Preloader";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    document.addEventListener("click", handleTrackedClick);
    return () => document.removeEventListener("click", handleTrackedClick);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  return (
    <>
      <Head>
        {/* Fica aqui (e não no _document) para o /admin trocar pelo manifesto do editor. */}
        <link rel="manifest" href="/favicon/site.webmanifest?v=pixel-3" key="manifest" />
      </Head>
      <GoogleAnalytics />
      <Preloader />
      <Component {...pageProps} />
    </>
  );
}
