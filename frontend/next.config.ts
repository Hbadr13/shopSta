import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  // experimental: {
  //   reactRefresh: true,
  // },
  /* config options here */
  swcMinify: true,
  fastRefresh: true,
  experimental: {
  },
  images: {
    domains: ['res.cloudinary.com', 'erona-demo.myshopify.com', 'randomuser.me', 'i.pravatar.cc']
  }
};

export default nextConfig;
