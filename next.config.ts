import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("http://localhost:8001/api/v1/files/**")],
  },
  // output: "standalone",
  serverActions: {
    allowedOrigins: ["urbanaut.club", "www.urbanaut.club", "localhost:3000"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
