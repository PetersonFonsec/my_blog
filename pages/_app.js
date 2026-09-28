import { useEffect } from "react";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { handleTrackedClick } from "../lib/analytics";
import "../styles/site.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    document.addEventListener("click", handleTrackedClick);
    return () => document.removeEventListener("click", handleTrackedClick);
  }, []);

  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}
