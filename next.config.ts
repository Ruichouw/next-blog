import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 允许从语雀 CDN 加载远程图片（示例：cdn.nlark.com/yuque/...）
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.nlark.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
