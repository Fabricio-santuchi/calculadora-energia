import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  images: { unoptimized: true },
  // Necessário porque o site tem 2 layouts raiz ((raiz) e [lang]) — sem
  // isso não tem como montar uma 404 única pro app inteiro.
  experimental: { globalNotFound: true },
};

export default nextConfig;
