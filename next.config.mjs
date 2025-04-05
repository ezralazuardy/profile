/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.1.71"],
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ["luxon", "@vercel/analytics", "@vercel/speed-insights"],
  },
  images: {
    minimumCacheTTL: 31536000, // cache for 1 year (31536000 seconds)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.medium.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      // apply cache headers for root static assets
      {
        source: "/:file*.{txt,xml,json,ico,png,jpg,jpeg,svg,webp,webm,mp4,woff,woff2}",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // immutable cache for 1 year (31536000 seconds)
          },
        ],
      },
      // apply cache headers for other static assets
      {
        source: "/(static|media|assets|images|videos|documents)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // immutable cache for 1 year (31536000 seconds)
          },
        ],
      },
      // apply cache headers for next.js static assets
      {
        source: "/_next/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // immutable cache for 1 year (31536000 seconds)
          },
        ],
      },
      // apply cache headers for vercel insights static assets
      {
        source: "/_vercel/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // immutable cache for 1 year (31536000 seconds)
          },
        ],
      },
      // apply hsts headers for all routes
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload", // hsts settings
          },
        ],
      },
    ];
  },
};

export default nextConfig;
