import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 향후 api.sajulab.ai 프록시 필요 시
  // async rewrites() {
  //   return [
  //     { source: '/api/:path*', destination: 'https://api.sajulab.ai/:path*' },
  //   ];
  // },
};

export default nextConfig;
