// Task V8 (ESPEC-TELAS.md): tira um print de cada página nos 4 tamanhos da
// espec e salva em docs/design/prints/, pra comparar lado a lado com as
// pranchas (*.dc.html). Roda em cima do build estático (out/), igual ao
// Playwright dos testes.
//
// Uso: npm run build && node scripts/tirar-prints.mjs

import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const PORTA = 4174;
const BASE_URL = `http://localhost:${PORTA}`;
const PASTA_PRINTS = path.resolve("docs/design/prints");

// Largura de cada tamanho da espec (seção 1 e 7b). Altura generosa —
// full-page cobre o resto.
// V11: 320 (celular pequeno, ex. iPhone SE 1ª geração) e 1920 (monitor
// widescreen comum) — pontas reais além dos 4 tamanhos desenhados.
const TAMANHOS = [
  { nome: "celular-pequeno", largura: 320 },
  { nome: "celular", largura: 390 },
  { nome: "tela600", largura: 600 },
  { nome: "tablet", largura: 768 },
  { nome: "computador", largura: 1440 },
  { nome: "widescreen", largura: 1920 },
];

const PAGINAS = ["/pt", "/pt/pc", "/pt/chuveiro", "/pt/geladeira", "/en/pc"];

function aguardarServidorPronto(url, tentativas = 30) {
  return new Promise((resolve, reject) => {
    const tentar = async (restantes) => {
      try {
        const resposta = await fetch(url);
        if (resposta.ok) return resolve();
      } catch {
        // servidor ainda não subiu, tenta de novo
      }
      if (restantes <= 0) return reject(new Error("servidor não respondeu"));
      setTimeout(() => tentar(restantes - 1), 500);
    };
    tentar(tentativas);
  });
}

async function main() {
  await mkdir(PASTA_PRINTS, { recursive: true });

  console.log(`Subindo "serve out" na porta ${PORTA}...`);
  const servidor = spawn(`npx serve out -p ${PORTA}`, {
    shell: true,
    stdio: "ignore",
  });

  try {
    await aguardarServidorPronto(BASE_URL);

    const navegador = await chromium.launch();
    const pagina = await navegador.newPage();

    for (const rota of PAGINAS) {
      for (const { nome, largura } of TAMANHOS) {
        await pagina.setViewportSize({ width: largura, height: 900 });
        await pagina.goto(`${BASE_URL}${rota}`, { waitUntil: "networkidle" });

        const nomeArquivo = `${rota.replaceAll("/", "-").slice(1)}--${nome}-${largura}px.png`;
        const caminho = path.join(PASTA_PRINTS, nomeArquivo);
        await pagina.screenshot({ path: caminho, fullPage: true });
        console.log(`✓ ${nomeArquivo}`);
      }
    }

    await navegador.close();
    console.log(`\nPrints salvos em ${PASTA_PRINTS}`);
  } finally {
    servidor.kill();
  }
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
