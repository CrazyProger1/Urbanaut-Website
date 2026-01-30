import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("http://localhost:8001/api/v1/files/**")],
  },
  // output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: [
        "urbanaut.club",
        "*.urbanaut.club", // wildcard may work partially; test with explicit ones first
        "www.urbanaut.club", // if you use/redirect to www
        "localhost:4000", // useful for local + proxy testing
        "127.0.0.1:4000",
      ],
    },
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
