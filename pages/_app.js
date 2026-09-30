import { useEffect, useSyncExternalStore } from "react";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { handleTrackedClick } from "../lib/analytics";
import "../styles/site.css";
import Preloader from "../components/Preloader";
import usePreloader from "../components/Preloader/usePreloader";
import useApplicationLoading from "../hooks/useApplicationLoading";

const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function App({ Component, pageProps }) {
  const loading = useApplicationLoading();
  const preloader = usePreloader(loading);
  const hydrated = useSyncExternalStore(subscribeToHydration, clientSnapshot, serverSnapshot);
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
      <GoogleAnalytics />
      <div aria-busy={hydrated && loading} inert={hydrated && preloader.visible}>
        <Component {...pageProps} />
      </div>
      <Preloader {...preloader} />
    </>
  );
}
