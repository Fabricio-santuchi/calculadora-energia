import type { MetadataRoute } from "next";
import { URL_BASE } from "@/lib/site";

// Exigido pelo "output: export": sem isso o Next trata robots.txt como uma
// rota dinâmica (gerada por requisição), que não existe em site estático.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${URL_BASE}/sitemap.xml`,
  };
}
