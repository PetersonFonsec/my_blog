import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Local preview only: production never receives an artificial loading delay.
const LOCAL_PREVIEW_DURATION = process.env.NODE_ENV === "development" ? 5000 : 0;

export default function useApplicationLoading() {
  const { events } = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(LOCAL_PREVIEW_DURATION > 0);

  useEffect(() => {
    if (!LOCAL_PREVIEW_DURATION) return undefined;
    const timer = window.setTimeout(() => setPreviewLoading(false), LOCAL_PREVIEW_DURATION);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ready = () => setInitialLoading(false);
    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready, { once: true });
    return () => window.removeEventListener("load", ready);
  }, []);

  useEffect(() => {
    let pendingUrl;
    const start = (url, { shallow }) => {
      if (shallow) return;
      pendingUrl = url;
      setRouteLoading(true);
    };
    const finish = (url) => {
      if (url !== pendingUrl) return;
      pendingUrl = undefined;
      setRouteLoading(false);
    };
    const error = (_error, url) => finish(url);
    events.on("routeChangeStart", start);
    events.on("routeChangeComplete", finish);
    events.on("routeChangeError", error);
    return () => {
      events.off("routeChangeStart", start);
      events.off("routeChangeComplete", finish);
      events.off("routeChangeError", error);
    };
  }, [events]);

  return initialLoading || routeLoading || previewLoading;
}
