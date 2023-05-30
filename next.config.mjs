import "./env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  // https://images.unsplash.com
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
