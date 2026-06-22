import type { NextConfig } from "next";

// Set by the GitHub Pages workflow to the repo name (e.g. "/vud-components")
// so assets resolve under the project subpath. Empty for local builds.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
