import type { NextConfig } from "next";

/**
 * Next.js config para deployment en GitHub Pages
 *
 * output: 'export' → static HTML export (no servidor Node)
 * basePath: requerido porque será servido desde /haztetuexamen/
 * images.unoptimized: GitHub Pages no soporta el optimizer de Next
 *
 * NOTA: Las API routes NO funcionan en static export.
 * Toda la lógica de órdenes (create / pdf) se movió a client-side con localStorage.
 */
const isProd = process.env.NODE_ENV === "production";
const REPO_NAME = "haztetuexamen";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["@haztetuexamen/shared"],
  // BasePath solo en producción (GitHub Pages); en dev local usa /
  basePath: isProd ? `/${REPO_NAME}` : "",
  assetPrefix: isProd ? `/${REPO_NAME}/` : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@react-three/drei", "motion"],
  },
};

export default nextConfig;
