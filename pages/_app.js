import { useEffect } from "react";
import "../styles/site.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  return <Component {...pageProps} />;
}
