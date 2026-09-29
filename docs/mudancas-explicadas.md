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

---

# Fase 6.5 — task V1 (Base)

## 13. Cores novas como variáveis CSS

- **O que mudou:** 6 cores que a espec pedia (`--texto-corpo`, `--ambar-escuro`,
  `--escuro-borda`, `--escuro-texto`, `--escuro-apagado`, `--borda-tracejada`) entraram em
  `globals.css`, do mesmo jeito que as cores que já existiam: hex cru dentro de `:root`, e um
  espelho em `@theme inline` (`--color-texto-corpo: var(--texto-corpo)` etc.) pra virar classe
  do Tailwind (`text-texto-corpo`, `border-borda-tracejada`...).
- **Onde:** `src/app/globals.css`.
- **Por quê:** a regra do projeto é nome, não hex solto nos componentes — assim, se uma cor
  mudar um dia, muda num lugar só.

**Resumo:** cor vira variável nomeada em dois passos: o valor cru, depois o espelho que o
Tailwind entende como classe.
**Pergunta:** por que a cor mora em `:root` E em `@theme inline`, em vez de só um lugar?

---

## 14. Breakpoint `xs` (480 px)

- **O que mudou:** `--breakpoint-xs: 30rem` em `@theme inline`. Isso faz o Tailwind aceitar o
  prefixo `xs:` nas classes (ex: `xs:h-[110px]`), pra estilos que só valem a partir de 480 px —
  a faixa entre o celular (390) e o tablet (768) que a espec chama de "tela de 600 px".
- **Onde:** `src/app/globals.css`.
- **Por quê:** o Tailwind já vem com `sm:`/`md:`/`lg:`, mas nenhum bate exatamente com os 4
  tamanhos que a espec desenhou. `xs:` fecha essa lacuna sem inventar convenção nova.

**Resumo:** breakpoint = ponto de largura onde o layout muda. `xs:` é um novo ponto, criado do
mesmo jeito que os outros (`--breakpoint-*` dentro de `@theme`).
**Pergunta:** uma classe `xs:h-[110px]` sem prefixo nenhum antes dela (só `h-[100px]`, por
exemplo) — em qual largura de tela cada uma vale?

---

## 15. Ícones num arquivo só

- **Problema:** o mapa `slugPt -> ícone` estava dentro de `src/app/[lang]/page.tsx`, então só a
  página inicial conseguia usar. A espec pede os mesmos ícones em "Calcule outros aparelhos"
  (dentro da página de aparelho, task V4).
- **O que mudou:** o mapa virou `ICONE_POR_APARELHO`, exportado de `src/lib/icones.ts`. A
  página inicial importa de lá agora, em vez de ter o mapa embutido.
- **Por quê:** dado compartilhado mora numa lib, não dentro de uma página — senão ela vira a
  "dona" dele sem motivo, e quem mais precisar tem que copiar.

**Resumo:** informação usada em mais de um lugar sai da página e vira um arquivo próprio,
importado pelos dois.
**Pergunta:** se amanhã a task 26 adicionar um aparelho novo (ex: air fryer), em quantos
arquivos você precisaria mexer pra ele aparecer com ícone em todo canto que usa
`ICONE_POR_APARELHO`?

---

## 16. Componente `EspacoAnuncio`

- **Problema:** o placeholder do anúncio estava com o JSX escrito direto dentro da página
  inicial — a task V4/V6 da espec pede o mesmo bloco também na página de aparelho, e copiar o
  JSX duas vezes é exatamente o problema que os outros componentes (`Header`, `PaginaAparelho`)
  já resolveram.
- **O que mudou:** virou `src/components/espaco-anuncio.tsx`, recebendo só `idioma`. O texto
  fica mais curto no celular ("Espaço do anúncio") e ganha " (AdSense)" a partir do breakpoint
  `xs:` — um `<span className="hidden xs:inline">`, então é o **mesmo** texto, só uma parte
  aparece ou some, sem duplicar string.
- **Onde:** `src/components/espaco-anuncio.tsx`; usado por enquanto só em
  `src/app/[lang]/page.tsx` (a página de aparelho ganha ele na task V4).
- **Por quê:** o texto "(AdSense)" é nome de marca — não traduz, por isso não faz parte do
  objeto `TEXTO` (que só tem o que muda por idioma).

**Resumo:** JSX repetido em mais de uma página vira componente. Esconder um pedaço de texto por
tamanho de tela é CSS (`hidden`/`xs:inline`), não duas strings diferentes.
**Pergunta:** por que não vale a pena criar `TEXTO.pt.comAdsense` e `TEXTO.pt.semAdsense`
como duas strings, do jeito que fizemos com `hidden`/`xs:inline`?

---

## 17. Nomes curtos e rótulos de potência em `aparelhos.ts`

- **Problema:** o código só tinha `nomeEn`/`nomePt`, que são longos e descritivos ("PC gamer
  (em uso)") — bons pra `<title>` de página, ruins pra caber num cartão pequeno da grade da
  inicial ou na trilha "Início / Aparelhos / {nome}".
- **O que mudou:** 4 campos novos no `Aparelho`: `nomeCurtoPt`, `nomeCurtoEn?`,
  `rotuloPotenciaPt`, `rotuloPotenciaEn?` — os dois `en` são opcionais (`?`) porque o chuveiro
  não existe em inglês, então não tem valor pra preencher. `rotuloPotencia` é texto pronto (ex:
  "50 W efetivo"), não só o número, porque a geladeira precisa da palavra "efetivo" do lado.
  A grade de aparelhos da inicial já foi atualizada pra usar esses campos novos em vez do
  `nomeEn`/`nomePt` + `potenciaWatts` + "W" que usava antes.
- **Onde:** `src/lib/data/aparelhos.ts`.
- **Teste novo:** `src/lib/data/dados.test.ts` — todo aparelho tem `nomeCurtoPt`/
  `rotuloPotenciaPt` preenchidos; os campos `en` existem só quando `idiomas` inclui `"en"` (e
  ficam `undefined` quando não inclui — o chuveiro é conferido nos dois sentidos).
- **Por quê:** um campo opcional (`?`) modela exatamente essa regra — "só existe às vezes" —
  sem precisar de string vazia (`""`) fingindo ausência.

**Resumo:** campo opcional (`?`) no tipo = "pode não existir de verdade", diferente de uma
string vazia. O teste confere as duas pontas: existe quando devia, some quando devia sumir.
**Pergunta:** por que `expect(aparelho.nomeCurtoEn).toBeUndefined()` é diferente de
`expect(aparelho.nomeCurtoEn).toBe("")`?

**Rodar:** `npm test`, `npx tsc --noEmit`, `npm run build`.

---

## 18. Task V2 — conteúdo novo dos aparelhos

- **Problema:** o parágrafo "Para gastar menos" ficava misturado no meio do texto de apoio, e
  não existia lugar pra guardar título de seção nem dica em formato de cartão (a espec pede as
  dicas como itens separados — título curto + texto — não como frase corrida).
- **O que mudou:**
  - `ConteudoAparelho` (`src/content/aparelhos/tipos.ts`) ganhou `tituloTexto`, `tituloDicas`,
    `dicas` (tupla de exatamente 3 `Dica`, cada uma com `titulo`, `texto` e um `icone?` — o
    nome do ícone é só uma string por enquanto; a troca por componente lucide de verdade é da
    task V4, que ainda não chegou) e os 5 campos opcionais da seção 5 (`rotuloPotencia`,
    `notaPotencia`, `notaTempo`, `explicacao`, `avisoResultado`).
  - Nos 15 arquivos de conteúdo (`src/content/aparelhos/{pt,en}/*.ts`), o parágrafo de dicas
    saiu de `textoApoio` e virou os 3 itens de `dicas`, com `tituloTexto`/`tituloDicas`
    preenchidos com o texto exato da espec (seção 9.2).
  - `geladeira`, `chuveiro` e `chaleira` ganharam os campos opcionais da seção 5 (rótulo de
    potência, notas, a caixa de explicação da geladeira e o aviso próprio dela).
- **Decisão que precisei tomar (espec ambígua):** a regra dizia pra remover o parágrafo que
  **começa** com "**Para gastar menos" / "**To spend less". Só que o parágrafo de dicas da
  **geladeira** começa com "**O que faz a geladeira gastar mais:**" — frase diferente, mesma
  função (virou as 3 dicas da seção 9.3). Tratei como o mesmo caso e removi, porque é o único
  parágrafo do arquivo que bate com as 3 dicas da espec; se tivesse deixado, o conteúdo ficaria
  duplicado (a mesma informação no texto corrido E nos cartões de dica).
  `ps5-xbox` (pt e en) nunca teve um parágrafo desses — as dicas ali são conteúdo 100% novo,
  não veio de nenhum parágrafo removido.
- **Onde:** `src/content/aparelhos/tipos.ts`, os 15 arquivos de conteúdo, e
  `src/content/aparelhos/conteudo.test.ts` (testes novos).
- **Por quê:** dado que descreve "como mostrar" (título de seção, dica em cartão) fica no
  arquivo de conteúdo, não decidido no componente React — a regra que já vínhamos seguindo
  desde a task 13.

**Resumo:** conteúdo que virou um formato novo de exibição (cartão de dica, em vez de frase no
meio do texto) sai do texto corrido e vira campo estruturado próprio no tipo.
**Pergunta:** por que faz sentido `dicas` ser `[Dica, Dica, Dica]` (tupla de exatamente 3) em
vez de `Dica[]` (array de qualquer tamanho)?

**Rodar:** `npm test` (148 passando), `npx tsc --noEmit`, `npm run build`.

---

## 19. Task V3 — cabeçalho e rodapé nos 4 tamanhos

- **Problema:** o cabeçalho tinha altura e tamanho de logo **fixos** (sempre 73 px, sempre
  36×36), então no celular ele ficava grande demais — a espec pede 60 px no celular, 64 na
  tela de 600 e só 73 a partir do tablet. O rodapé sempre mostrava as 3 colunas completas
  (Aparelhos, Site, Idioma) mesmo no celular, onde a espec pede só uma linha compacta de links.
- **O que mudou — cabeçalho (`header.tsx`):**
  - Altura e tamanho do logo/nome viraram responsivos: `h-[60px] xs:h-16 md:h-[73px]` e o mesmo
    padrão pro logo (32 → 34 → 36 px) e pro texto (19 → 20 → 22 px).
  - O botão de abrir o menu ganhou a borda/fundo/cantos que a espec pedia (antes era só o
    ícone solto).
  - **O menu do celular foi refeito do zero**, seguindo `MobileMenu.dc.html` — fundo escuro
    (`bg-foreground`), os mesmos 4 aparelhos em destaque do rodapé (com nome e potência), um
    link "Ver todos os aparelhos" em âmbar, os links de Sobre/Contato/Privacidade, e o troca de
    idioma virou **2 botões grandes** embaixo (`Português` / `English`), em vez da pilulazinha
    pequena que só existe na barra de cima (que fica escondida no celular de qualquer jeito).
- **O que mudou — rodapé (`footer.tsx`):**
  - A coluna "Aparelhos" agora lista só **4 aparelhos em destaque** (não todos), com um link
    "Ver todos" apontando pra `/{idioma}#aparelhos` — antes só tinha o link "Ver todos"
    sozinho, sem nenhum aparelho listado, e ele ia pra `/{idioma}` sem a âncora.
  - No celular e na tela de 600, as 3 colunas somem e viram **uma linha só que quebra**: Sobre,
    Contato, Privacidade e **só o outro idioma** (não os dois) — a partir do tablet (`md:`)
    volta a mostrar as 3 colunas completas, empilhadas; só no computador (`lg:`) elas ficam
    lado a lado com o nome do site.
  - A frase de apoio (tagline) só aparece a partir de 480 px — no celular puro, só o nome.
- **Dado novo compartilhado:** `src/lib/aparelhos-destaque.ts`, com `APARELHOS_DESTAQUE`
  (os 4 slugs por idioma) — usado tanto no rodapé quanto no menu do celular, pra não duplicar
  essa lista em dois arquivos.
- **Decisão que precisei tomar (espec sem número exato):** o tamanho do logo/ícone/texto na
  tela de 600 (`xs:`) não tinha corner-radius nem tamanho do ícone especificados, só o tamanho
  do quadrado (34 px) e do nome (20 px) na tabela da seção 7b. Mantive o corner-radius de 9 px
  do celular (em vez de já usar o 10 px do computador) e escolhi 20 px pro ícone (passo redondo
  do Tailwind, entre os 18 px do celular e os 22 px do computador).
- **Onde:** `src/components/header.tsx`, `src/components/footer.tsx`,
  `src/lib/aparelhos-destaque.ts` (novo).

**Resumo:** "responsivo" não é só "cabe na tela" — às vezes o conteúdo muda de verdade entre um
tamanho e outro (3 colunas viram 1 linha, a pilulazinha vira 2 botões), não só o tamanho da
fonte. Dado repetido em 2 componentes (a lista de aparelhos em destaque) vira arquivo
compartilhado, mesma regra de sempre.
**Pergunta:** por que o link do idioma dentro do menu do celular também precisou ser `<a>`
normal (não `<Link>`), do mesmo jeito que a pilulazinha da barra de cima?

**Rodar:** `npm test` (148 passando), `npx tsc --noEmit`, `npm run build`, e conferir no
navegador em 390/600/768/1440 px se os links do rodapé abrem as páginas certas em pt e en.

---

## 20. Task V4 — página de aparelho no computador

A maior task até agora — reconstrói quase a página inteira. Fiz em pedaços:

- **Topo (4.1):** trilha nova ("Início / Aparelhos / {nome curto}", cada pedaço linkando pro
  lugar certo, o último só texto) + o `<h1>` que **saiu do centro pra esquerda** e cresceu (era
  `text-3xl md:text-4xl`, virou 34px celular / 60px computador) + um subtítulo novo, que muda de
  texto conforme o aparelho é de horas ou minutos (`TEXTOS_APARELHO.subtitulo`, no idioma certo).
  O `<h2>`/subtítulo que ficavam **dentro** do cartão da calculadora saíram — o `<h1>` já diz o
  que é a página.
- **Calculadora em 2 colunas (4.2):** a ordem dos campos mudou (**País → Potência → Tempo →
  Preço**, antes era Potência/Tempo/País/Preço), os campos cresceram pra 52px, e a tarifa
  ganhou a unidade "{moeda}/kWh" dentro do campo (não tinha nada antes). O painel de resultado
  foi reescrito quase inteiro: apareceu o selo "RESULTADO", o valor do mês cresceu pra 64px, as
  4 caixas viraram **3** (tirei o kWh/mês dali) e o kWh/mês ganhou uma seção própria embaixo com
  **barra de progresso** (`width: min(100%, kWh ÷ 300 × 100%)`, `aria-hidden` porque o número já
  está escrito do lado). O rodapé do painel agora cita a fonte e a data da tarifa
  (`Tarifa: {fonte}, atualizada em {data}` — reusando o truque do `timeZone: "UTC"` que
  já tínhamos aprendido, pra não mostrar o dia errado).
- **Compatibilidade com a inicial:** o `Calculadora`/`ResultadoPainel` são os **mesmos**
  componentes usados na calculadora genérica da home hoje — só que a home quer o formato
  compacto de sempre, e a página de aparelho quer o novo, cheio. Resolvido com duas props novas
  (`exibirCabecalho` no `Calculadora`, `compacto` no `ResultadoPainel`) que trocam a classe do
  container e o que é mostrado, sem duplicar os componentes. Isso é temporário: a task V6 troca
  o componente da home por um de verdade (`CalculadoraCompacta`), e aí essas props deixam de
  precisar cobrir os dois casos.
- **Espaço do anúncio (4.3):** só chamar o `EspacoAnuncio` da task V1 — não tinha ainda na
  página de aparelho, só na inicial.
- **`OutrosAparelhos` (novo, 4.4):** grade com todos os aparelhos do idioma, o da página atual
  destacado (fundo âmbar, ícone invertido, `aria-current="page"`). Recebe `idioma` +
  `slugAtual`.
- **Dicas (novo, 4.5):** usa o `conteudo.dicas` da task V2 — cada ícone é uma string
  (`"gauge"`, `"clock"`...) mapeada pro componente lucide de verdade agora, em
  `ICONE_DICA` (`lib/icones.ts`).
- **Texto + "Como a conta é feita" + perguntas (4.6):** título novo acima do texto
  (`conteudo.tituloTexto`), a caixa da fórmula (3 linhas, muda entre horas/minutos e pt/en —
  4 variações no total, em `TEXTOS_APARELHO.formula`), e o FAQ virou **`<details>`/`<summary>`**
  de verdade (era `<div>`) — abre/fecha sem JavaScript nenhum, funciona igual no export
  estático, e a primeira pergunta já vem aberta.
- **Bug que eu mesmo cometi e achei na conferência final:** criei o campo `explicacao` da
  geladeira na task V2 (a caixa "Por que 50 W e não o valor da etiqueta?") mas **esqueci de usar
  ele em lugar nenhum** — a task V4 tinha ficado sem essa caixa. Só percebi porque, antes de
  fechar a task, fui conferir os 3 números da tabela da espec (seção 10) um por um em
  `out/*.html`, e resolvi olhar o texto da geladeira também enquanto estava lá. Adicionei a
  caixa que faltava (ícone `Info`, título, texto) e voltei a conferir.
- **Decisão que precisei tomar (espec com dois números de altura):** a seção 1 diz "campos: 52px
  na página de aparelho e 50px na inicial e no celular" — texto ambíguo sobre se "no celular"
  se aplica à página de aparelho também. Interpretei como: página de aparelho = 52px em
  **qualquer** tamanho de tela (a seção 4.2 tem sua própria descrição de celular e não repete
  50px em lugar nenhum), inicial = 50px sempre (bate com a seção 6.1, que descreve a
  `CalculadoraCompacta`).
- **Onde:** `src/lib/textos.ts` (`TEXTOS_APARELHO`), `src/lib/icones.ts` (`ICONE_DICA`),
  `src/components/calculadora-form.tsx`, `src/components/resultado-painel.tsx`,
  `src/components/outros-aparelhos.tsx` (novo), `src/components/pagina-aparelho.tsx`.

**Resumo:** um componente pode servir dois formatos bem diferentes (compacto vs completo) com
uma prop booleana simples, em vez de virar dois componentes — mas isso é uma ponte temporária,
não a solução final (a V6 resolve de vez pro lado da home). Conferir os números exatos da
espec no HTML gerado (não só "parece que rodou sem erro") é o que pegou o bug da caixa
esquecida — teste automatizado nenhum ia notar isso, porque nenhum teste checava aquele texto
específico.
**Pergunta:** por que rodar `npm test` sozinho não seria suficiente pra pegar o bug da caixa
de explicação que faltava — o que esse tipo de erro tem de diferente de um erro de cálculo?

**Rodar:** `npm test` (148 passando), `npx tsc --noEmit`, `npm run build`, e os 3 números da
espec (seção 10): `/pt/pc` → R$ 44,71/mês, `/pt/geladeira` → R$ 38,33/mês, `/pt/chuveiro` →
R$ 29,28/mês — todos conferidos direto no HTML gerado.

---

## 21. Task V5 — variações (aparelhos em minutos e geladeira)

- **O que descobri:** essa task já estava **inteiramente resolvida** — quando construí a V4,
  liguei todos os campos opcionais da espec 5 (`rotuloPotencia`, `notaPotencia`, `notaTempo`,
  `explicacao`, `avisoResultado`) no `Calculadora` de uma vez, porque não fazia sentido separar
  "montar a caixa de explicação" de "descobrir onde a caixa de explicação entra na página" —
  são a mesma mudança. Não sobrou nenhum código novo pra escrever na V5.
- **O que conferi (de novo, isolado, pra não confiar só na V4):**
  - `/pt/chuveiro`: a caixa do custo unitário mostra "Por banho de 10 min" **e** "R$ 0,96"
    juntos, do jeito que a task pede.
  - `/pt/geladeira`: R$ 38,33/mês, mais a caixa "Por que 50 W e não o valor da etiqueta?", o
    rótulo "Potência média" e o aviso próprio, todos presentes.
  - Bônus: conferi chaleira (pt e en) e chuveiro pt — as notas de potência/tempo aparecem nos
    dois idiomas.
- **Por quê não sobrou nada:** os campos "espec 5" são dados que já vêm prontos do conteúdo
  (`src/content/aparelhos/**`, escritos na V2) — a única coisa que faltava era o **componente**
  saber usá-los, e isso é exatamente o que a V4 fez ao mexer no `Calculadora` pra virar a
  versão completa da página de aparelho. Task V5 e V4 descrevem a mesma mudança de código sob
  dois nomes diferentes na espec.

**Resumo:** nem toda task da lista vira código novo — às vezes a divisão do plano não bate
exatamente com a divisão natural do código, e duas tasks describem uma mudança só. Vale
conferir de novo, isolado, antes de dar por encerrado — não é o mesmo que "confiar que já
passou antes".
**Pergunta:** por que faz mais sentido `rotuloPotencia`/`notaPotencia`/etc. morarem no arquivo
de conteúdo (`src/content/aparelhos/pt/chuveiro.ts`) em vez de dentro do `Calculadora` como um
`if (aparelho.slugPt === "chuveiro")`?

**Rodar:** `npm test` (148 passando), `npx tsc --noEmit`, `npm run build`, e os casos
`/pt/chuveiro` e `/pt/geladeira` conferidos de novo no HTML gerado.

---

## 22. Task V6 — página inicial

- **O que mudou:** a `CalculadoraGenerica` (dropdown + o `Calculadora` de sempre, empilhados)
  saiu, e entrou o `CalculadoraCompacta` (`src/components/calculadora-compacta.tsx`) — um
  componente novo, escrito do zero, porque o layout da inicial (2 campos numa linha, 3 na
  outra, resultado empilhado em vez de painel de 2 colunas) não bate com a estrutura do
  `Calculadora` da página de aparelho de jeito nenhum. Ele reaproveita só as **funções**
  testadas (`criarCalculoSchema`, `calcularCusto`, `formatarMoeda`, `numeroParaTexto`,
  `detectarPaisPeloIdiomaDoNavegador`) — nenhuma delas foi tocada.
  - Sempre preenchido (1000 W, 4 h, tarifa do país) — nunca "—" ao abrir a página.
  - O dropdown de aparelho só lista os que são em **horas** (`unidadeTempo === "horas"`) — os de
    minutos (chuveiro, chaleira) ficam de fora porque já têm página própria.
  - Escolher um aparelho preenche só potência e horas — país/tarifa **não mudam** (diferente do
    truque de `key` que a `CalculadoraGenerica` antiga usava, que resetava tudo).
  - O símbolo da moeda dentro do campo de preço ("R$", "US$", "£"...) vem de uma função nova,
    pequena, só desse componente (`simboloMoeda`) — usa o mesmo `Intl.NumberFormat` por trás,
    só pega a parte do símbolo em vez do número formatado inteiro.
- **`h1` da inicial:** cresceu de 48px fixo pra 38px celular / 64px computador (espec 6.1).
- **Outras seções (6.2 a 6.5):** a espec já dizia "está feito, só conferir as medidas" — ajustei
  o que estava fora: cor do número dos passos (virou o token `ambar-escuro` da V1, era hex
  solto), espaçamento entre seções (72px, era um valor aproximado antes), cantos e paddings dos
  cartões de aparelho (18px/14 celular, era 16px fixo), e a grade de aparelhos ganhou o degrau
  que faltava — **3 colunas no tablet** (a espec 7b pede 2/2/3/4 por tamanho de tela; o código
  antigo pulava direto de 2 pra 4, sem passar por 3). O bloco de tarifas trocou cor solta
  (`border-background/20`) pelos tokens novos da V1 (`escuro-borda`, `escuro-apagado`).
- **Limpeza:** `calculadora-generica.tsx` ficou sem nenhum lugar que o importasse — apaguei.
- **Onde:** `src/components/calculadora-compacta.tsx` (novo),
  `src/app/[lang]/page.tsx`, `src/lib/textos.ts` (`diaAnoResumo`), arquivo apagado:
  `src/components/calculadora-generica.tsx`.

**Resumo:** quando dois lugares usam o mesmo componente mas precisam de layouts realmente
diferentes (não só cor/tamanho), às vezes o certo é **não** forçar os dois a compartilhar o
componente — é escrever um novo que reaproveita só a lógica de verdade (as funções puras
testadas), não o JSX.
**Pergunta:** por que trocar o país no `CalculadoraCompacta` **não** deveria resetar a
potência/horas escolhidas, mesmo que trocar o **aparelho** resete?

**Rodar:** `npm test` (148 passando), `npx tsc --noEmit`, `npm run build`, e o número da espec
(seção 10): `/pt` com 1000 W e 4h mostra **R$ 127,75** por mês assim que abre — conferido no
HTML gerado (o `/en` mostra um valor diferente, $21,90, porque o padrão em inglês é a tarifa
dos EUA, não a do Brasil — isso é esperado, não é bug).

---

## 23. Task V7 — responsivo nos 4 tamanhos

- **Ferramenta nova:** em vez de só olhar no navegador, escrevi um teste automatizado
  (`e2e/responsivo.spec.ts`, usando o Playwright que já tínhamos da task 16) que abre `/pt`,
  `/pt/pc`, `/pt/chuveiro` e `/pt/geladeira` em 7 larguras (360, 390, 480, 600, 768, 1024,
  1440 — os 4 tamanhos da espec mais as pontas que a validação da task pede) e confere se
  `document.documentElement.scrollWidth` é maior que a largura da tela — se for, tem algo
  vazando e criando rolagem lateral. **28 de 28 passaram** de primeira: nada corta.
- **Três problemas reais que achei conferindo os números exatos da tabela 7b (não só rodando o
  teste de rolagem lateral, que só pega vazamento, não pega "o tamanho errado mas sem vazar"):**
  1. **Painel de resultado sem o degrau do tablet:** a espec pede 4 tamanhos pro "mês" (44 → 48
     → 56 → 64 px) e eu só tinha feito 2 (44 → 64, pulando os 48 e 56 do meio). Mesma coisa no
     padding do painel (20 → 24 → 32 → 40, eu tinha só 20 → 40). Corrigido nos dois lados do
     card (`calculadora-form.tsx` e `resultado-painel.tsx`), com `xs:`/`md:`/`lg:` certinhos.
  2. **Os dois `<h1>` (inicial e aparelho) com só 2 tamanhos**, mesmo problema: a espec pede 4
     degraus (34/40/48/60 no aparelho, 38/44/52/64 na inicial) e eu tinha feito só celular +
     computador, pulando os dois do meio.
  3. **`OutrosAparelhos` com o breakpoint errado E ao contrário:** usei `sm:` (640px, o padrão
     do Tailwind) em vez do `xs:` customizado (480px, o da nossa espec) — e pior, tinha
     escrito a troca de layout invertida: o código fazia o cartão nascer com ícone à esquerda e
     virar ícone-em-cima a partir de 640px, quando a espec quer o contrário (ícone em cima só no
     celular puro, ícone à esquerda a partir de 480px). Provavelmente sobrou de um
     copiar-e-colar sem revisar com atenção.
- **Decisão que precisei tomar (custo x benefício):** a tabela 7b descreve um pareamento bem
  específico de campos no formulário da página de aparelho — "País + Potência lado a lado" e
  "Tempo + Preço lado a lado" a partir da tela de 600. Como os 4 campos já nascem exatamente
  nessa ordem (País, Potência, Tempo, Preço — da task V4), um grid de 2 colunas simples
  (`xs:grid xs:grid-cols-2`) forma os pares certos sozinho, sem precisar reordenar nada nem usar
  JavaScript — e volta pra uma coluna só no computador (`lg:flex lg:flex-col`), como a espec
  4.2 pede. Não tentei replicar o detalhe mais fino do celular puro (que pede só Tempo+Preço
  pareados, com País e Potência sozinhos) porque exigiria separar os "chips" de dentro do bloco
  da Potência pra virarem uma linha própria no grid — mudança maior, risco maior, ganho visual
  pequeno numa faixa de tela específica. Registrando a decisão em vez de fazer sem avisar.
- **Onde:** `e2e/responsivo.spec.ts` (novo), `src/components/resultado-painel.tsx`,
  `src/components/calculadora-form.tsx`, `src/components/pagina-aparelho.tsx`,
  `src/app/[lang]/page.tsx`, `src/components/outros-aparelhos.tsx`.

**Resumo:** "não corta a tela" e "está do tamanho certo" são duas verificações diferentes — um
teste automatizado pega vazamento de layout, mas não pega "o texto está pequeno demais nessa
largura porque pulei um degrau do responsivo". Os dois precisam de conferência, um por
ferramenta, outro manual comparando número por número com a espec.
**Pergunta:** por que um grid de 2 colunas consegue "parear" os campos automaticamente, sem eu
precisar dizer explicitamente "País vai com Potência"?

**Rodar:** `npm test` (148 passando), `npx tsc --noEmit`, `npm run build`, e
`npx playwright test e2e/` (31 testes, incluindo os 28 novos de rolagem lateral).

---

## 24. Task V8 — conferência lado a lado

- **Script novo:** `scripts/tirar-prints.mjs` — sobe o build estático (`out/`) com `serve`
  numa porta própria (4174, pra não brigar com a porta 4173 que os testes do Playwright já
  usam), abre `/pt`, `/pt/pc`, `/pt/chuveiro`, `/pt/geladeira` e `/en/pc` nos 4 tamanhos da
  espec (390/600/768/1440) e salva 20 prints em `docs/design/prints/` (rodar com
  `npm run prints`). Ficou fora do Git (`.gitignore`) porque só essas 20 imagens já somam
  6,1 MB, e a espec avisou que isso podia acontecer.
- **Conferência real, olhando as imagens (não só rodando script):**
  - `/pt/pc` no computador: bateu muito próximo da prancha — trilha, h1 à esquerda, calculadora
    de 2 colunas, painel com barra de consumo, "Calcule outros aparelhos" com o atual destacado,
    dicas com ícone, texto + fórmula + FAQ em `<details>`. Um susto falso: a fórmula parecia
    mostrar "(watts **+** 1000)" na imagem — fui conferir o HTML gerado e o caractere certo (÷)
    está lá; é só a fonte IBM Plex Mono desenhando o ÷ de um jeito que, naquele tamanho pequeno
    da captura, os pontinhos de cima e de baixo quase não aparecem e parece um "+". Não mexi em
    nada, porque não tinha nada errado — só registrando o susto.
  - `/pt/pc` no celular: achei uma diferença de verdade. A espec (4.2, "Celular") descreve o
    painel de resultado como **2 caixas** (Dia, Ano) + **2 linhas finas** (unitário e consumo) —
    mas eu tinha implementado o mesmo painel de **3 caixas** do computador em todos os tamanhos,
    só mudando fonte/espaçamento, nunca a estrutura. Corrigi: a caixa do unitário some no
    celular (`hidden xs:block`) e vira uma linha fina própria (`xs:hidden`); a grade passa de
    3 pra 2 colunas nesse tamanho; a barra de consumo também ganhou a altura certa (8px no
    celular, 10px da tela de 600 em diante, a espec pede as duas).
  - Isso quebrou 3 testes do `calculadora-form.test.tsx`: como o jsdom não aplica CSS (não sabe
    o que é `hidden` nem `xs:`), os dois lugares onde o rótulo/valor do unitário aparece agora
    (a caixa e a linha fina) contam como "visíveis" ao mesmo tempo pro teste — troquei
    `getByText` (que exige exatamente 1) por `getAllByText` com a contagem nova, com um
    comentário explicando o motivo, pra não confundir quem for mexer depois.
- **`calculadora-form.test.tsx` também foi atualizado por outro motivo** (não relacionado aos
  prints): os testes renderizavam `<Calculadora>` sem `exibirCabecalho={false}`, testando o
  modo "compacto" — que, desde a task V6, **nenhuma página usa mais** (a `CalculadoraCompacta`
  não usa o `Calculadora`; a página de aparelho sempre passa `exibirCabecalho={false}`). Os
  testes passavam, mas testavam um caminho morto. Agora testam o modo real, e sobrou um teste
  novo conferindo que o modo compacto (o padrão da prop) ainda existe e funciona, caso alguém
  precise dele de novo.

**Resumo:** só rodar o script e ver "20 prints gerados" não é a mesma coisa que **olhar** as 20
imagens — o bug do painel do celular não aparecia em nenhum teste automatizado (nada tinha
"vazado" da tela, só a estrutura estava errada), só apareceu comparando a imagem com a
descrição da espec com atenção. E teste que passa sempre pode estar testando a coisa errada —
vale perguntar de vez em quando "isso aqui roda em alguma página de verdade?".
**Pergunta:** por que trocar `getByText` por `getAllByText` foi a correção certa nos 3 testes
que quebraram, em vez de mudar o componente pra não duplicar o texto?

**Rodar:** `npm test` (151 passando), `npx tsc --noEmit`, `npm run build`, `npm run test:e2e`
(31 testes) e `npm run prints` pra gerar as imagens de novo — depois é olhar elas ao lado das
pranchas em `docs/design/*.dc.html`.

---

# Fase 6.5 — task V9 (revisão pós-V8, pedida pelo Fabricio)

## 25. Item 1/9 — altura dos selects (país, aparelho)

- **Problema:** os selects (`SelectTrigger`) ficavam com 32px de altura, bem menor que os 50/52px
  dos campos de texto ao lado, mesmo eu já tendo passado `className="h-[52px]"` (ou `h-[50px]`).
- **Causa:** o componente `SelectTrigger` (base do shadcn) já vem com
  `data-[size=default]:h-8` embutido no próprio componente. Esse seletor tem uma **classe de
  atributo** (`[data-size="default"]`) a mais que uma classe comum como `h-[52px]` — e em CSS,
  quando dois seletores têm origem/importância iguais, quem tem **mais especificidade** ganha,
  não quem "vem depois" no HTML. Por isso o `h-8` sempre vencia, não importa a ordem das
  classes no JSX.
- **O que mudou:** troquei por `h-13!` (52px) e `h-12.5!` (50px) — o `!` no fim, no Tailwind v4,
  gera a classe com `!important`, que ganha de qualquer especificidade normal.
- **Onde:** `src/components/calculadora-form.tsx` (select de País, página de aparelho) e
  `src/components/calculadora-compacta.tsx` (selects de Aparelho e País, inicial).

**Resumo:** duas classes CSS que mexem na mesma propriedade não "brigam" pela ordem no texto —
brigam pela especificidade do seletor. `!important` é a saída de emergência quando você não
controla o CSS do componente por dentro.
**Pergunta:** por que `data-[size=default]:h-8` tem mais especificidade que `h-[52px]`, se os
dois são "só uma classe" no JSX?

---

## 26. Item 2/9 — topo da inicial no tablet (1 coluna)

- **Problema:** o topo da inicial (selo + h1 + calculadora) virava 2 colunas a partir de `md:`
  (768px) — mas a prancha `TabletInicio.dc.html` mostra tudo numa coluna só nesse tamanho
  (texto em cima, calculadora embaixo, largura cheia), só virando 2 colunas de verdade no
  computador (1440, `lg:`). Com 2 colunas cedo demais, a coluna da calculadora ficava estreita
  e cortava o valor "Por ano".
- **O que mudou:** troquei `md:grid-cols-2` por `lg:grid-cols-2` na seção do topo. Como o texto
  já vem antes da calculadora na ordem do HTML, elas já empilham certinho sozinhas (texto em
  cima, calculadora embaixo) sem precisar reordenar nada — só faltava não forçar 2 colunas cedo
  demais.
- **Onde:** `src/app/[lang]/page.tsx`.

**Resumo:** breakpoint errado (`md:` em vez de `lg:`) pode não "cortar a tela" (por isso o
teste de rolagem lateral da V7 não pegou isso) — só aperta o conteúdo até algo específico não
caber mais, tipo um valor numérico. Vale conferir visualmente, não só "não vaza".
**Pergunta:** por que esse bug não aparecia nos testes de rolagem lateral da V7, mesmo sendo um
problema real de layout?

---

## 27. Item 3/9 — bloco de tarifas no tablet (mesmo bug de breakpoint + espaço faltando)

- **Problema 1:** mesma causa do item 2 — o bloco "De onde vem o preço da energia?" virava
  2 colunas (texto de um lado, países do outro) a partir de `md:`, cedo demais. A prancha
  mostra texto em cima e os países numa grade embaixo até o tablet, só ficando lado a lado no
  computador.
- **Problema 2:** o nome do país e o valor (ex: "Brasil" e "R$ 1,05") não tinham espaço mínimo
  entre si — só `justify-content: space-between`, que empurra os dois pras pontas, mas se o
  texto crescer (nome de país mais longo, ou fonte maior numa tela mais estreita) eles podem
  colar. Faltava um `gap`.
- **O que mudou:** `md:grid-cols-2` → `lg:grid-cols-2` no grid externo (texto vs. países), e
  `gap-2` (8px) no `flex justify-between` de cada caixa de país.
- **Onde:** `src/app/[lang]/page.tsx`.

**Resumo:** `justify-content: space-between` empurra os itens pras bordas, mas não garante
espaço mínimo entre eles — se o conteúdo crescer o suficiente, os itens do meio colidem. Um
`gap` garante a distância mínima, `space-between` sozinho não.
**Pergunta:** em que situação `justify-between` sem `gap` realmente falha — o texto precisa
ficar grande o bastante, ou pode acontecer só com o texto normal, dependendo da largura da
caixa?

---

## 28. Item 4/9 — texto e perguntas da página de aparelho, empilhados até o tablet

- **Problema:** mesmo padrão dos itens 2 e 3 — a coluna de texto ("Quanto um PC gamer gasta" +
  "Como a conta é feita") e a de perguntas frequentes viravam lado a lado a partir de `md:`
  (768px), só que a prancha `Tablet.dc.html` mostra as duas como seções cheias, uma embaixo da
  outra, até o tablet — só ficam lado a lado no computador (`lg:`, 1024px).
- **O que mudou:** troquei `md:grid-cols-2 md:items-start md:gap-16` por
  `lg:grid-cols-2 lg:items-start lg:gap-16` — mantive `md:pt-[72px] md:pb-24` como estava
  (só o número de colunas mudou de breakpoint, o espaçamento vertical não foi mexido porque
  não foi apontado como problema).
- **Onde:** `src/components/pagina-aparelho.tsx`.

**Resumo:** é o terceiro caso seguido do mesmo tipo de bug (breakpoint `md:` onde devia ser
`lg:`) — um padrão que vale lembrar: qualquer grid de "2 colunas lado a lado" que a espec
desenha como aparecendo só no computador precisa nascer em `lg:`, não em `md:`, mesmo que
pareça "razoável" já juntar no tablet.
**Pergunta:** por que faz sentido a regra geral ser "2 colunas grandes de conteúdo só a partir
do computador", enquanto os cartões pequenos (tipo a grade de aparelhos) já viram grade a
partir do tablet?

---

## 29. Item 5/9 — select de Aparelho mostrava "outro" cru

- **Problema:** o select de Aparelho da inicial (`CalculadoraCompacta`) mostrava literalmente
  "outro" (o `value` interno) em vez de "Outro / personalizado", e o mesmo aconteceria com
  qualquer aparelho escolhido (mostraria o `slugPt`, tipo "pc", em vez de "PC gamer").
- **Causa:** o `Select.Value` do base-ui (a peça que mostra o texto no botão fechado) só sabe
  formatar automaticamente o rótulo certo se o `Select` receber uma prop `items` — uma lista de
  `{ value, label }`. Sem ela, ele só tem o `value` puro pra mostrar, porque não tem como saber
  qual `<SelectItem>` (que só existe dentro do menu aberto) corresponde a esse valor. O select
  de País já fazia isso certo (`items={opcoesPais}`) desde que foi criado; o de Aparelho nunca
  ganhou o mesmo tratamento.
- **O que mudou:** criei `opcoesAparelho` (mesmo formato do `opcoesPais`: "outro" +
  personalizado, PLUS cada aparelho em horas com seu nome curto) e passei como
  `items={opcoesAparelho}` pro `<Select>`.
- **Onde:** `src/components/calculadora-compacta.tsx`.

**Resumo:** um componente de select "controlado" (`value` + `onValueChange`) só resolve o
`value` pro rótulo visível se alguém disser explicitamente essa relação — não tem mágica que
"adivinha" o texto a partir do menu.
**Pergunta:** por que o `items` resolve isso mesmo o `<SelectContent>` já tendo os
`<SelectItem>` com o texto certo dentro do menu — por que não bastava isso?

---

## 30. Item 6/9 — `EspacoAnuncio` sem margem lateral de verdade

- **Problema:** a caixa tracejada tinha `px-4` (16px), mas isso é **padding**: empurra o
  conteúdo (o texto "Espaço do anúncio") pra dentro da caixa, e não afeta onde a borda da
  própria caixa fica. Como não tinha nenhuma **margem** externa, a borda tracejada ficava colada
  na beira da tela em vez de respeitar os 16/24/32px que o resto do conteúdo do site usa.
- **O que mudou:** virou um wrapper de 2 níveis — o de fora só tem `px-4 xs:px-6 md:px-8`
  (16/24/32px, sem borda nem fundo, só existe pra criar a margem), e o de dentro tem
  `max-w-[1120px] mx-auto` + a borda tracejada, exatamente como as outras seções do site já
  fazem (só que elas não têm borda visível, por isso o problema nunca apareceu nelas).
- **Onde:** `src/components/espaco-anuncio.tsx`.

**Resumo:** padding empurra o conteúdo pra dentro da caixa; margem afasta a caixa inteira (com
borda e tudo) da vizinhança. Quando o elemento tem borda visível, a diferença fica óbvia — sem
borda, os dois "parecem" iguais visualmente, o que escondeu esse bug até agora.
**Pergunta:** por que esse bug não apareceu em nenhuma outra seção do site, mesmo todas usando
o mesmo `px-4` de sempre?

---

## 31. Item 7/9 — ícone do raio faltando no selo e no "RESULTADO"

- **Problema:** o selo "Grátis, sem cadastro" (inicial) e o rótulo "RESULTADO"/"RESULT" (painel
  de resultado da página de aparelho) não tinham o ícone de raio que a prancha mostra do lado
  esquerdo dos dois.
- **O que mudou:** `<Zap className="size-[18px]" />` antes do texto, nos dois lugares — mesmo
  ícone usado no logo do cabeçalho, só que sem o quadrado de fundo.
- **Onde:** `src/app/[lang]/page.tsx` (selo) e `src/components/resultado-painel.tsx`
  ("RESULTADO").

**Resumo:** faltava só isso — sem lição nova aqui, é ajuste direto na prancha.
**Pergunta:** por que faz sentido repetir o mesmo ícone (raio) no selo, no "RESULTADO" e no
logo — o que esses 3 lugares têm em comum na identidade visual do site?
