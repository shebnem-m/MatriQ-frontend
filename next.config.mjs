/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "privoz43.ru",
        port: "",
        pathname: "/upload/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/:path*", // öz backend portunuzu yazın
      },
    ];
  },
};

export default nextConfig;