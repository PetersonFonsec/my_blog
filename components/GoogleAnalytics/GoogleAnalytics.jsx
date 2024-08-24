const GoogleAnalytics = () => {
  function initAnalytics(){
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', process.env.ANALYTICS_PUBLIC_MEASUREMENT_ID, {
      page_path: window.location.pathname,
      });
    }
  }

  function urlAnalytics(){
    return`https://www.googletagmanager.com/gtag/js?id=${process.env.ANALYTICS_PUBLIC_MEASUREMENT_ID}`
  }

  return (
    <>
      <script
        strategy="lazyOnload"
        src={urlAnalytics()}
      ></script>
      <script strategy="lazyOnload">
        {initAnalytics()}
      </script>
    </>
  );
};

export default GoogleAnalytics;
