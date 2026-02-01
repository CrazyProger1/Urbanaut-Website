import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("http://localhost:8001/api/v1/files/**"),
      new URL("https://api.urbanaut.club/api/v1/files/**"),
    ],
  },
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
    incomingRequests: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
