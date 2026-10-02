import type { MetadataRoute } from "next";
import { aparelhos } from "@/lib/data/aparelhos";
import { URL_BASE } from "@/lib/site";

// Mesmo motivo do robots.ts: exigido pelo "output: export".
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginasFixas: MetadataRoute.Sitemap = [
    { url: URL_BASE },
    { url: `${URL_BASE}/en` },
    { url: `${URL_BASE}/pt` },
    { url: `${URL_BASE}/en/about` },
    { url: `${URL_BASE}/pt/sobre` },
    { url: `${URL_BASE}/en/contato` },
    { url: `${URL_BASE}/pt/contato` },
    { url: `${URL_BASE}/en/privacidade` },
    { url: `${URL_BASE}/pt/privacidade` },
  ];

  // Mesma lógica de generateStaticParams (src/app/[lang]/[aparelho]/page.tsx):
  // reaproveitar garante que o sitemap nunca lista uma página que não existe
  // de verdade, nem esquece uma nova (ex: quando a task 26 adicionar aparelhos).
  const paginasDeAparelho: MetadataRoute.Sitemap = aparelhos.flatMap(
    (aparelho) => {
      const entradas: MetadataRoute.Sitemap = [];
      if (aparelho.idiomas.includes("en")) {
        entradas.push({ url: `${URL_BASE}/en/${aparelho.slugEn}` });
      }
      if (aparelho.idiomas.includes("pt")) {
        entradas.push({ url: `${URL_BASE}/pt/${aparelho.slugPt}` });
      }
      return entradas;
    },
  );

  return [...paginasFixas, ...paginasDeAparelho];
}
