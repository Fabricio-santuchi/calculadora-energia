# Mudanças de 28/09/2026 — explicadas

Cada item diz: qual era o problema, o que mudou, onde está e por que foi feito assim.
No fim de cada um tem um resumo de 3 linhas e uma pergunta pra você pensar (sem nota, é só
pra fixar).

---

## 1. Enter recarregava a página

- **Problema:** a calculadora é um `<form>`. Apertar Enter num campo "enviava" o formulário, e
  o navegador recarregava a página e apagava tudo.
- **O que mudou:** o form ganhou `onSubmit={(e) => e.preventDefault()}`.
- **Onde:** `src/components/calculadora-form.tsx`, linha ~141.
- **Por quê:** o cálculo é ao vivo, então não existe "enviar". O `preventDefault()` cancela o
  comportamento padrão do navegador.

**Resumo:** form + Enter = envio. Envio sem destino = recarregar. `preventDefault()` cancela.
**Pergunta:** e se tirasse a tag `<form>` e usasse uma `<div>`? O que você perderia?

---

## 2. Título da página (h1) e título da calculadora (h2)

- **Problema:** a página do aparelho não tinha o título do aparelho. O único `<h1>` era
  "Calculadora de Custo de Energia", igual em todas as páginas. O Google usa o h1 pra entender
  do que a página fala.
- **O que mudou:** a `PaginaAparelho` mostra um `<h1>` com o título do aparelho (ex.: "Quanto
  custa um banho no chuveiro elétrico?"), e o título da calculadora virou `<h2>`.
- **Onde:** `src/components/pagina-aparelho.tsx` (linha ~22) e
  `src/components/calculadora-form.tsx` (linha ~144).
- **Por quê:** uma página = um h1, e ele deve ser diferente em cada página.

**Resumo:** h1 é o assunto da página. Um por página. A calculadora é uma parte, então é h2.
**Pergunta:** na página inicial (`/pt`), qual deveria ser o h1?

---

## 3. "Por uso" mostrava o preço errado

- **Problema:** no chuveiro e na chaleira, o quadrinho "Por uso" mostrava o custo de **uma
  hora** ligado (R$ 5,78 no chuveiro), não o de um banho.
- **O que mudou:**
  - Função nova `calcularCustoPorUso(potência, minutos, tarifa)` em `src/lib/calculo.ts`
    (linha ~37). Chuveiro 5500 W, 10 min, R$ 1,05 → R$ 0,96.
  - Função nova `rotuloCustoUnitario()` em `src/lib/textos.ts` (linha ~85), que escolhe o
    texto: "Por hora de uso", "Por uso de 5 min" ou "Por banho de 10 min".
  - O chuveiro ganhou `tipoDeUso: "banho"` em `src/lib/data/aparelhos.ts`.
  - O `ResultadoPainel` agora recebe `custoUnitario` e `rotuloUnitario` prontos, em vez de
    decidir sozinho.
- **Por quê:** a conta ficou numa função pura (fácil de testar) e o componente só mostra.

**Resumo:** custo de 1 uso = kW × (minutos ÷ 60) × tarifa. A conta mora na lib, o painel só mostra.
**Pergunta:** se a pessoa digitar 20 minutos no chuveiro, o rótulo muda pra quê?

---

## 4. Rótulo e unidade do tempo

- **Problema:** o campo sempre dizia "Horas ligado por dia", mesmo no chuveiro, que é em minutos.
- **O que mudou:** o rótulo usa `t.tempoMinutos` ou `t.tempoHoras` conforme o aparelho, e
  apareceu a unidade dentro do campo ("h/dia" ou "min/dia"). O campo de potência ganhou um "W"
  do mesmo jeito. O id do campo mudou de `horas` pra `tempo`.
- **Onde:** `src/components/calculadora-form.tsx`, linha ~197.
- **Por quê:** os textos já existiam em `textos.ts`, só não estavam sendo usados.

**Resumo:** `unidade === "minutos" ? A : B` escolhe o texto. A unidade fica dentro do campo.
**Pergunta:** por que o `id` virou `tempo` e não `minutos`?

---

## 5. Seletor de país aparecia vazio

- **Problema:** o `Select` não tinha `value`. Mesmo com o Brasil detectado, ele mostrava "Escolha
  um país".
- **O que mudou:** `value={pais}` (agora ele é *controlado* pelo estado) e `items={opcoesPais}`,
  que diz qual texto mostrar pra cada código ("Brasil (BRL 1,05)" em vez de "BR").
- **Onde:** `src/components/calculadora-form.tsx`, linha ~245.
- **Por quê:** componente controlado = o React manda no valor, então a tela sempre bate com o
  estado.

**Resumo:** sem `value`, o Select tem memória própria. Com `value`, ele obedece ao estado.
**Pergunta:** o que aconteceria se você passasse `value={pais}` mas esquecesse o `onValueChange`?

---

## 6. Tarifa com ponto em português

- **Problema:** ao trocar de país, a tarifa entrava como "1.05" (com ponto) na página em português.
- **O que mudou:** `setTarifa(numeroParaTexto(valor, idioma))` em vez de `String(valor)`.
- **Onde:** `src/components/calculadora-form.tsx`, linha ~252.
- **Por quê:** a função já existia e já era usada no valor inicial. Faltava usar aqui também.

**Resumo:** número → texto sempre pela `numeroParaTexto`, pra respeitar a vírgula do pt.
**Pergunta:** onde mais no código um número vira texto na tela?

---

## 7. Atalhos sem "+" e atalho escolhido marcado

- **Problema:** "+ 350W" parecia "somar 350". E não dava pra ver qual atalho estava valendo.
- **O que mudou:** o texto virou "350 W" / "10 min". Cada atalho tem
  `aria-pressed={valorAtual === valor}`, e o CSS pinta de âmbar quando está pressionado
  (`aria-pressed:bg-[#FBE7B8] aria-pressed:border-[#E8A317]`).
- **Onde:** `src/components/calculadora-form.tsx`, linhas ~34, ~180 e ~226.
- **Por quê:** o `aria-pressed` serve pro leitor de tela *e* pro estilo ao mesmo tempo.

**Resumo:** um atributo, dois usos: acessibilidade e cor. O "+" confundia.
**Pergunta:** se a pessoa digitar "5500,0" na mão, o atalho 5500 W fica marcado? Por quê?

---

## 8. Tarifas novas

- **O que mudou:** EUA 0,18 · Reino Unido 0,26 · Brasil 1,05 · Canadá 0,17 · Portugal 0,24 ·
  Alemanha 0,39 · Austrália 0,30 · México 1,37. Todas com data 2026-09-28 e fonte.
- **Novo:** campo opcional `nota` (pt/en) na tarifa. O México usa pra avisar que lá a tarifa é
  por faixas. A nota aparece embaixo do campo de preço quando o país está escolhido. O texto de
  ajuda da tarifa ("Valor médio do país já preenchido...") também passou a aparecer.
- **Onde:** `src/lib/data/tarifas.ts` e `docs/conteudo.md` (seção 6).

**Resumo:** dado novo = dado com fonte e data. Campo opcional (`?`) só pra quem precisa.
**Pergunta:** por que `nota` é opcional e `fonte` é obrigatória?

---

## 9. Textos dos aparelhos em português e inglês

- **O que mudou:** os textos que você aprovou no documento viraram arquivos:
  - `src/content/aparelhos/pt/<aparelho>.ts` (8 aparelhos)
  - `src/content/aparelhos/en/<aparelho>.ts` (7, sem chuveiro)
  - `src/content/aparelhos/index.ts` tem a função `obterConteudo(idioma, slugPt)`
  - `src/content/aparelhos/tipos.ts` tem o tipo `ConteudoAparelho` (agora com `tituloPagina`)
- A página (`src/app/[lang]/[aparelho]/page.tsx`, linha ~42) busca o conteúdo e, se não
  achar, mostra a 404. O placeholder saiu.
- **Negrito:** os trechos entre `**asteriscos**` aparecem em negrito. A função
  `dividirNegrito()` (`src/lib/negrito.ts`) quebra o texto em pedaços, e o componente
  `TextoComNegrito` mostra cada pedaço com ou sem `<strong>`.
- **Por quê:** a chave é o `slugPt` porque ele é igual nos dois idiomas. O negrito não usa
  `dangerouslySetInnerHTML` (HTML cru), que é arriscado e o React desaconselha.

**Resumo:** texto fica em arquivo de conteúdo, não no componente. Uma função acha o texto certo.
**Pergunta:** pra criar a página da air fryer (task 26), quais arquivos você teria que mexer?

---

## 10. Limpeza e detalhes

- Removido o `calculoSchema` antigo de `src/lib/schema.ts`: ninguém usava mais (o atual é
  `criarCalculoSchema`).
- O "kWh por mês" agora sai com vírgula em português ("27,9 kWh" em vez de "27.9 kWh").
- O FAQ só aparece se o aparelho tiver perguntas.

---

## 11. Testes

145 testes passando (antes eram 118). Novos:

- `src/lib/calculo.test.ts` — custo por uso (banho de 10 min = 0,9625).
- `src/lib/textos.test.ts` — rótulos "Por hora", "Por uso de 5 min", "Por banho de 10 min".
- `src/lib/negrito.test.ts` — negrito com `**`.
- `src/content/aparelhos/conteudo.test.ts` — todo aparelho tem texto em cada idioma da página,
  e o chuveiro não tem em inglês.
- `src/lib/data/dados.test.ts` — nota do México.
- `src/components/calculadora-form.test.tsx` — Enter não recarrega, h2, rótulo em minutos,
  custo por banho, atalho marcado, país aparece no seletor.

**Rodar:** `npm test`, e `npm run dev` pra olhar `/pt/chuveiro`, `/pt/pc` e `/en/pc`.

---

## 12. Plano (CLAUDE.md)

- **Task 24 — Links de afiliado** entrou como última task da v1, e saiu da lista "fora do escopo".
- **Fase 8 — Crescimento (tasks 25 a 32):** README de portfólio, mais aparelhos, bandeira
  tarifária, economia ao trocar, tarifa por distribuidora, entrada pelo selo, compartilhar e
  equivalências. Os três últimos também saíram da lista "fora do escopo".
