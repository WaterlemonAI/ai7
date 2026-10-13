/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Render's 512 MiB runtime can be exhausted when the Insights index asks
    // the server-side optimizer to process many large editorial images at once.
    // Keep Next/Image sizing and lazy loading, but serve the committed assets
    // directly so image requests do not allocate sharp workers in production.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  poweredByHeader: false,
  compress: true,
}

export default nextConfig
