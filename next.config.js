
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exposes the Vercel variable to the browser bundle at build time.
  env: { ANALYTICS_PUBLIC_MEASUREMENT_ID: process.env.ANALYTICS_PUBLIC_MEASUREMENT_ID ?? "" },
  async redirects() {
    return [
      { source: "/about", destination: "/#sobre", permanent: true },
      { source: "/blog", destination: "/posts", permanent: true },
      { source: "/projetos", destination: "/posts", permanent: true },
    ];
  },
};

const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const { syncPosts } = require("./scripts/sync-posts.cjs");

module.exports = async (phase) => {
  if ((phase === PHASE_PRODUCTION_BUILD || phase === PHASE_DEVELOPMENT_SERVER)
    && !process.env.__PRISMIC_BUILD_SNAPSHOT_READY) {
    await syncPosts();
    // Next loads config again in child workers; reuse this build's snapshot.
    process.env.__PRISMIC_BUILD_SNAPSHOT_READY = "1";
  }
  return nextConfig;
};
