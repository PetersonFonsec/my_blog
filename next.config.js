
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/about", destination: "/#sobre", permanent: true },
      { source: "/blog", destination: "/posts", permanent: true },
      { source: "/projetos", destination: "/posts", permanent: true },
    ];
  },
};

module.exports = nextConfig;
