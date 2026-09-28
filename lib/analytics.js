export const GA_MEASUREMENT_ID = process.env.ANALYTICS_PUBLIC_MEASUREMENT_ID;

export function trackEvent(name, params = {}) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

// Elements opt in with data-ga-event plus optional data-ga-* params, e.g.
// <a data-ga-event="cta_click" data-ga-label="LinkedIn" data-ga-location="contato">.
// One delegated listener keeps tracking out of the page components.
export function handleTrackedClick(event) {
  const element = event.target instanceof Element && event.target.closest("[data-ga-event]");
  if (!element) return;
  const { gaEvent, ...data } = element.dataset;
  const params = {};
  Object.entries(data).forEach(([key, value]) => {
    if (!key.startsWith("ga") || key.length === 2) return;
    const name = key.slice(2).replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).replace(/^_/, "");
    params[name] = value;
  });
  const href = element.getAttribute("href");
  if (href) params.link_url = new URL(href, location.href).href;
  trackEvent(gaEvent, params);
}
