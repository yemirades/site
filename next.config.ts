import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Static HTML export so the site can be hosted on GitHub Pages.
  output: "export",
  // GitHub project pages are served from /site, while local development stays at /.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
  // next/image optimization is not available in a static export.
  images: { unoptimized: true },
  // Silence the "multiple lockfiles" workspace-root warning.
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
