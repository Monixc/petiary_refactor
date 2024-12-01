import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.AWS_S3_HOSTNAME || "",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: process.env.DALLE_API_HOSTNAME || "",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
