import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack設定: SVGをReactコンポーネントとして読み込む
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
