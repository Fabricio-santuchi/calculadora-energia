import { ImageResponse } from "next/og";
import { NOME_DO_SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Exigido pelo "output: export" (mesmo motivo do sitemap.ts/robots.ts) —
// sem isso o Next não sabe que essa imagem pode ser gerada em build time.
export const dynamic = "force-static";

// Arquivos especiais como esse não herdam o generateStaticParams do
// layout.tsx sozinhos — precisa declarar de novo aqui.
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "pt" }];
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: "en" | "pt" }>;
}) {
  const { lang } = await params;
  const tagline =
    lang === "pt"
      ? "Quanto custa deixar ligado?"
      : "How much does it cost to leave it on?";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1B1A17",
        color: "#F6F3EC",
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 700, color: "#F2B53A" }}>
        {NOME_DO_SITE}
      </div>
      <div style={{ fontSize: 32, marginTop: 16, opacity: 0.8 }}>{tagline}</div>
    </div>,
    { ...size },
  );
}
