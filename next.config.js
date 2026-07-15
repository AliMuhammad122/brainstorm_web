/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      { source: "/categories", destination: "/screens/categories" },
      { source: "/cart", destination: "/screens/cart" },
      { source: "/select", destination: "/screens/select" },
      { source: "/checkout", destination: "/screens/checkout" },
      { source: "/track-order", destination: "/screens/track-order" },
      { source: "/login", destination: "/auth/login" },
      { source: "/signup", destination: "/auth/signup" },
      { source: "/forgot-password", destination: "/auth/forgot-password" },
      { source: "/verify-otp", destination: "/auth/verify-otp" },
      { source: "/set-password", destination: "/auth/set-password" },
    ];
  },
};

module.exports = nextConfig;
