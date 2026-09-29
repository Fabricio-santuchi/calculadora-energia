import { test, expect } from "@playwright/test";

// Espec (ESPEC-TELAS.md, seção 7b): 4 tamanhos desenhados — celular 390,
// tela de 600, tablet 768, computador 1440. Validação da task V7: nada
// corta nem cria rolagem lateral de 360 a 1440px, então testamos também
// as pontas (360, a menor largura de celular comum) e alguns valores
// intermediários pra pegar quebras que só acontecem "no meio do caminho".
// V11: 320 (celular bem antigo/pequeno, ex. iPhone SE 1ª geração) e 1920
// (monitor widescreen comum) — as duas pontas reais além do que a espec
// desenhou.
const LARGURAS = [320, 360, 390, 480, 600, 768, 1024, 1440, 1920];
const PAGINAS = ["/pt", "/pt/pc", "/pt/chuveiro", "/pt/geladeira"];

for (const pagina of PAGINAS) {
  for (const largura of LARGURAS) {
    test(`${pagina} em ${largura}px não tem rolagem lateral`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: largura, height: 900 });
      await page.goto(pagina);

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));

      // scrollWidth > clientWidth significa que tem conteúdo vazando pra
      // fora da tela — o usuário teria que rolar de lado pra ver tudo.
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });
  }
}
