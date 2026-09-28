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
