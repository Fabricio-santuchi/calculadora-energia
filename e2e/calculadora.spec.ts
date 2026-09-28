import { test, expect } from "@playwright/test";

// Caso conhecido do CLAUDE.md: PC de 300W, 8h/dia, tarifa 0,75 -> mensal ~54,75.
// A fórmula não muda com o idioma/moeda, só o símbolo e o separador decimal.

test.describe("página em inglês", () => {
  // Fixa o idioma do navegador, senão o Chromium do Playwright usa um padrão
  // próprio, e o useEffect de detecção de país (baseado em navigator.language)
  // pode trocar o país sozinho — mesma armadilha que já vimos nos testes
  // com Jest/RTL (lá resolvida fixando navigator.language no beforeEach).
  test.use({ locale: "en-US" });

  test("/en/pc calcula certo (caso conhecido)", async ({ page }) => {
    await page.goto("/en/pc");

    await page.getByLabel("Appliance power").fill("300");
    await page.getByLabel("Hours on per day").fill("8");
    await page.getByLabel("Energy price").fill("0.75");

    await expect(page.getByText(/\$\s?54\.75/)).toBeVisible();
  });
});

test.describe("página em português", () => {
  test.use({ locale: "pt-BR" });

  test("/pt/pc calcula certo (caso conhecido, vírgula)", async ({ page }) => {
    await page.goto("/pt/pc");

    await page.getByLabel("Potência do aparelho").fill("300");
    await page.getByLabel("Horas ligado por dia").fill("8");
    await page.getByLabel("Preço da energia").fill("0,75");

    await expect(page.getByText(/R\$\s?54,75/)).toBeVisible();
  });
});

test("rota inexistente mostra a página 404", async ({ page }) => {
  const resposta = await page.goto("/en/isso-nao-existe");

  expect(resposta?.status()).toBe(404);
  await expect(page.getByText("Página não encontrada")).toBeVisible();
});
