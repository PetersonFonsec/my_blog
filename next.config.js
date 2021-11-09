const withPWA = require("next-pwa");
const isProd = process.env.NODE_ENV === "production";

module.exports = withPWA({
  i18n: {
    locales: ["pt-br"],
    defaultLocale: "pt-br",
  },
  pwa: {
    dest: "public",
    disable: !isProd,
  },
  images: {
    domains: ["images.prismic.io"],
  },
});
