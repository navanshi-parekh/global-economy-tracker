/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // 🚀 FORCES NEXT.JS TO OUTPUT STATIC COMPILATION CHUNKS FOR DEPLOYMENT
  images: {
    unoptimized: true,       // Required for static exports when using standard img optimizations
  },
  reactStrictMode: true,
};

export default nextConfig;