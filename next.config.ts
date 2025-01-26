import { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "arkive-public.s3.eu-north-1.amazonaws.com" },
      { hostname: "shux-dev.s3.eu-west-2.amazonaws.com" },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default config;
