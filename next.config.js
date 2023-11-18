/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  api: {
    bodyParser: false,
  },
};

module.exports = nextConfig;
