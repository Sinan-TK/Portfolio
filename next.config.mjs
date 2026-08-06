/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  /* The server bundle references `.next/server/vendor-chunks/motion-dom.js`
   * (framer-motion), but webpack intermittently fails to emit that chunk:
   * `next build` reports success and then `next start` dies with
   * MODULE_NOT_FOUND. Turning off vendor splitting for the server build keeps
   * those modules inside the page bundle, so there's no chunk to go missing.
   * Server bundles aren't downloaded by users, so the size cost is irrelevant.
   * (`serverExternalPackages` also avoids it, but loads a second copy of React
   * and breaks prerendering with "Cannot read properties of null".) */
  webpack: (config, { isServer }) => {
    if (isServer) config.optimization.splitChunks = false;
    return config;
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
