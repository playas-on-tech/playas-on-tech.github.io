/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML export for GitHub Pages (output in ./out).
  output: "export",
  // GitHub Pages has no image optimizer; we use plain <img> anyway.
  images: { unoptimized: true },
  // Emit /route/index.html so clean URLs (e.g. /aniversario/) work on Pages.
  trailingSlash: true,
};

export default nextConfig;
