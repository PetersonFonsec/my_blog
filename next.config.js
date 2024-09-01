
const isProd = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: !isProd
});

module.exports = withPWA({
  i18n: {
    locales: ["pt-br"],
    defaultLocale: "pt-br",
  },
  images: {
    domains: ["images.prismic.io"],
  },
  compiler:{
    styledComponents: true
  }
});
