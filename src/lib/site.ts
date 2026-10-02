// Nome do site (conferido em 02/10/2026: sem marca registrada igual no Brasil
// nem nos EUA, então fica). Trocar aqui troca em título, metadata e rodapé.
export const NOME_DO_SITE = "WattCheck";

// Endereço do site no ar (subdomínio do domínio santux.com.br, task 20). Usado
// nas URLs canônicas, no hreflang, no sitemap e nas imagens de compartilhamento.
export const URL_BASE = "https://wattcheck.santux.com.br";

// E-mail de contato mostrado no site. Recebido pelo Email Routing da
// Cloudflare, que encaminha pro e-mail pessoal (testado na task 22g).
export const EMAIL_CONTATO = "contato@wattcheck.santux.com.br";

// Imagem de compartilhamento gerada por src/app/[lang]/opengraph-image.tsx.
// Toda página que define `openGraph` no generateMetadata precisa repassar
// isso em `images`: o Next SUBSTITUI o openGraph herdado pelo da página (não
// mescla campo a campo), então sem isso a imagem some nas páginas filhas.
export function imagemCompartilhamento(idioma: "pt" | "en") {
  return [
    {
      url: `/${idioma}/opengraph-image`,
      width: 1200,
      height: 630,
      alt:
        idioma === "pt"
          ? `${NOME_DO_SITE} — quanto custa deixar ligado?`
          : `${NOME_DO_SITE} — how much does it cost to leave it on?`,
    },
  ];
}
