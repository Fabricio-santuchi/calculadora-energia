# Especificação das telas — versão definitiva (28/09/2026)

Este documento diz **exatamente** como cada tela do site tem que ficar. Ele vem do canvas
"Calculadora de Energia — Visual", aprovado pelo Fabricio em 28/09/2026. Os arquivos
`*.dc.html` desta pasta são a imagem de referência. Este documento é a regra.

**Se o `.dc.html` e este documento discordarem, vale este documento.**

## 0. Regras para quem for implementar (Claude Code)

- Objetivo: o site em `/pt` e `/pt/pc` (e todas as páginas de aparelho) ficar **idêntico** ao
  canvas nos 4 tamanhos: computador (1440 px), tablet (768 px), tela de 600 px e celular (390 px).
- Os `.dc.html` são só referência visual. Não copiar a estrutura (`<x-dc>`, `<sc-for>`,
  `{{...}}`, `DCLogic`). Tudo vira componente React com Tailwind.
- **Não mexer na lógica que já funciona e está testada:** `lib/calculo.ts`, `lib/numero.ts`,
  `lib/schema.ts`, `lib/pais.ts`, cálculo ao vivo, validação só depois do blur (`tocados`),
  detecção de país, `aria-live`, rota dinâmica, metadata, sitemap. Mudar só a **aparência** e
  a **montagem** das telas. Se precisar mudar uma função, os testes dela continuam passando.
- Todo texto de interface existe em **pt e en** (em `lib/textos.ts`). Os textos novos deste
  documento já vêm nos dois idiomas.
- Os dados novos (dicas, títulos, nomes curtos, notas) vão nos arquivos de dados/conteúdo, não
  espalhados pelos componentes (seção 9).
- No fim de cada task: `npm test`, `npx tsc --noEmit`, `npm run build`, e comparar com o
  `.dc.html` (task V8).
- O Fabricio decidiu que o Claude Code pode escrever o código destas tasks (Fase 6.5). Depois de
  cada uma, explicar no formato "COMO ME ENSINAR" do CLAUDE.md: onde mudou, o que mudou, por
  quê, resumo de 3 linhas e 1 pergunta. Acrescentar essa explicação em
  `docs/mudancas-explicadas.md`.

## 1. Base visual (tokens)

Já estão em `globals.css`: papel `#F6F3EC`, cartão `#FFFDF8`, tinta `#1B1A17`, texto suave
`#5E5A52`, borda `#DDD6C8`, borda de campo `#CFC7B6`, âmbar `#E8A317`, âmbar claro `#F2B53A`,
âmbar fundo `#FBE7B8`, bege `#F1ECE1` e erro `#A3261B`.

**Cores que faltam** (criar como variáveis CSS com nome, não usar hex solto nos componentes):

| Nome sugerido | Hex | Onde |
|---|---|---|
| `--texto-corpo` | `#3D3A34` | parágrafos longos (texto de apoio, Sobre) |
| `--ambar-escuro` | `#8A5A00` | números 01/02/03 da inicial, hover de link |
| `--escuro-borda` | `#3A3833` | bordas dentro do painel escuro (resultado, tarifas, rodapé) |
| `--escuro-texto` | `#C9C2B3` | texto secundário sobre fundo escuro |
| `--escuro-apagado` | `#9A937F` | texto apagado sobre fundo escuro (datas, eixos) |
| `--borda-tracejada` | `#BDB4A1` | borda tracejada do espaço de anúncio |

**Fontes:** Fraunces 600 em todos os títulos (h1, h2, h3 grandes, nome do site), IBM Plex Sans no
texto e IBM Plex Mono em números, valores, unidades (W, h/dia, kWh) e fórmulas.

**Medidas:**
- Conteúdo com 1120 px de largura máxima, centralizado. Celular: margem de 16 px.
- Cantos: campo 12 px, card 16 px, cartão de aparelho 16 px (18 px na inicial), calculadora
  20 px, bloco escuro de tarifas 24 px, chip/pílula 999 px.
- Campos: altura 52 px na página de aparelho e 50 px na inicial e no celular. Borda 1 px
  `#CFC7B6` e fundo branco `#FFFFFF`. A unidade fica **dentro** do campo, à direita, em Plex Mono,
  cor `#5E5A52`.
- Foco: contorno de 3 px `#E8A317`.
- Sombra da calculadora: `0 1px 0 #1B1A17, 0 24px 48px -24px rgba(27,26,23,0.25)`, com borda
  de 1 px `#1B1A17`.

**Quebras de tela** (4 tamanhos desenhados; cada um tem prancha própria):

| Faixa | Prancha de referência | Largura desenhada | Tailwind |
|---|---|---|---|
| celular | `Mobile*.dc.html` | 390 px | padrão (sem prefixo), até 479 px |
| tela de 600 px (celular grande deitado / tablet pequeno) | `Tela600*.dc.html` | 600 px | `xs:` a partir de 480 px — criar no `globals.css`: `@theme { --breakpoint-xs: 30rem; }` |
| tablet | `Tablet*.dc.html` | 768 px | `md:` (768 a 1023 px) |
| computador | `Inicio.dc.html`, `Main.dc.html` e demais | 1440 px (conteúdo 1120) | `lg:` (1024 px ou mais) |

Resumo do que muda em cada faixa está na seção 7b. Margem lateral: 16 px (celular), 24 px
(600), 32 px (tablet), conteúdo centralizado com máximo de 1120 px (computador).

**Chip de atalho** (potência e tempo):
- Altura mínima 40 px (44 no celular), padding 0 14 px, arredondado 999 px.
- Texto em Plex Mono 14 px: "350 W", "10 min". Sem "+".
- **Normal:** borda `#CFC7B6`, fundo branco.
- **Escolhido** (`aria-pressed="true"`): borda `#E8A317`, fundo `#FBE7B8`, texto `#1B1A17`.

## 2. Cabeçalho (`header.tsx`) — `Header.dc.html`

- Altura de 73 px, com borda inferior de 1 px `#DDD6C8` e fundo papel. O conteúdo fica em
  1120 px.
- **Logo:** quadrado de 36 × 36, cantos 10 px, fundo `#1B1A17`, com o raio (lucide `Zap` ou o
  SVG do design) em `#E8A317` de 22 px. Ao lado, espaço de 10 px e "WattCheck" em Fraunces
  600 22 px.
- **Navegação:** "Aparelhos" e "Sobre", altura 44 px, padding 0 14 px, cantos 10 px, 15 px
  peso 500. O item ativo tem fundo `#FBE7B8` e peso 600.
- **Idioma:**
  - Pílula de 40 px de altura, borda `#DDD6C8`, 16 px de distância do menu.
  - Dentro, "PT" e "EN" de 32 px de altura. O idioma atual tem fundo `#FBE7B8` e peso 600.
  - Isso já está feito. Só conferir as medidas e manter a animação do View Transition.
- **Celular:**
  - Altura de 60 px e padding de 16 px.
  - Logo de 32 × 32 (cantos 9 px, raio de 18 px) e nome em 19 px.
  - Botão do menu de 44 × 44, com borda `#DDD6C8`, cantos 12 px e fundo `#FFFDF8`.
  - O menu aberto segue `MobileMenu.dc.html`.

## 3. Rodapé (`footer.tsx`) — `Footer.dc.html`

- **Fundo e largura:** fundo `#1B1A17`, cor `#C9C2B3`, conteúdo em 1120 px, 48 px de espaço
  em cima e em baixo.
- **Coluna da esquerda (360 px):**
  - "WattCheck" em Fraunces 22 px, cor `#F6F3EC`;
  - a frase do site em 14 px;
  - "© {ano} WattCheck" em 13 px, cor `#9A937F`.
- **À direita:** 3 colunas com 72 px entre elas, texto 15 px. O título de cada coluna é
  `#F6F3EC` peso 600, e os links são `#C9C2B3` sem sublinhado.
- **Coluna "Aparelhos"** (mudança em relação ao código atual):
  - **pt:** PC gamer, Geladeira, Ar-condicionado, Chuveiro elétrico, Ver todos;
  - **en:** Gaming PC, Fridge, Air conditioner, Electric kettle, See all;
  - os links vão para `/{idioma}/{slug}`, e "Ver todos" vai para `/{idioma}#aparelhos`.
- **Coluna "Site":** Sobre, Contato, Política de Privacidade.
- **Coluna "Idioma":** Português e English.
- **Celular:**
  - Padding de 32 px 16 px.
  - Nome em 20 px.
  - Uma linha de links que quebra: Sobre, Contato, Privacidade, English (ou Português),
    com 44 px de altura cada.

## 4. Página de aparelho — `Main.dc.html` (computador) e `Mobile.dc.html` (celular)

É o modelo de **todas** as páginas de aparelho (`/pt/pc`, `/en/pc`, `/pt/geladeira`...). As
variações de minutos e da geladeira estão na seção 5.

Ordem na página: cabeçalho → topo → calculadora → anúncio → outros aparelhos → dicas → texto
+ perguntas → rodapé.

### 4.1 Topo

- Container de 1120 px, 48 px acima (24 px no celular).
- **Trilha:**
  - pt: "Início / Aparelhos / {nome curto}"; en: "Home / Appliances / {nome curto}";
  - 14 px (13 px no celular), cor `#5E5A52`, com 8 px entre os itens;
  - "Início" leva para `/{idioma}` e "Aparelhos" para `/{idioma}#aparelhos`;
  - O último item é texto, sem link.
- **h1:** `conteudo.tituloPagina`, em Fraunces 600, 60 px (34 px no celular), altura de linha
  1.05, letras -0.02em, largura máxima de 820 px e **alinhado à esquerda** (hoje está
  centralizado).
- **Subtítulo:** 19 px (16 px no celular), cor `#5E5A52`, largura máxima de 680 px. Texto novo
  em `textos.ts`, conforme a unidade de tempo:
  - pt, horas: "Coloque a potência, quantas horas por dia ele fica ligado e o preço da energia.
    A conta aparece na hora, por dia, por mês e por ano."
  - pt, minutos: "Coloque a potência, quantos minutos por dia você usa e o preço da energia. A
    conta aparece na hora, por uso, por dia, por mês e por ano."
  - en, horas: "Enter the power, how many hours a day it's on and your electricity price. The
    cost shows up instantly, per day, month and year."
  - en, minutos: "Enter the power, how many minutes a day you use it and your electricity
    price. The cost shows up instantly, per use, day, month and year."
- **Some:** o título "Calculadora de Custo de Energia" e o subtítulo que ficam dentro do cartão
  da calculadora (o `<h2>{t.titulo}</h2>` atual) **saem**. O h1 da página já diz o que é.

### 4.2 Calculadora (computador): 2 colunas

Bloco de 1120 px, com 40 px de espaço acima, cantos 20 px, borda 1 px `#1B1A17`, a sombra da
seção 1 e `overflow: hidden`. São duas colunas iguais.

**Coluna esquerda — formulário:**
- Fundo `#FFFDF8`, padding de 40 px e 28 px entre os campos.
- **Ordem dos campos** (muda em relação ao código atual): **País → Potência → Tempo → Preço
  da energia**.
- Cada rótulo tem 14 px e peso 600, com 10 px até o campo.
- **País:** o `Select` atual, com 52 px de altura, mostrando "Brasil (BRL 1,05)".
- **Potência:**
  - O campo tem "W" dentro, à direita.
  - Embaixo ficam os chips de `atalhosPotencia`, no estilo da seção 1.
  - A mensagem de erro fica embaixo, 14 px, cor `#A3261B`.
- **Tempo:**
  - O rótulo e a unidade dependem do aparelho: "Horas ligado por dia" com "h/dia", ou
    "Minutos de uso por dia" com "min/dia".
  - Os chips de `atalhosTempo` aparecem se o aparelho tiver.
  - A nota do tempo aparece se houver (seção 5).
- **Preço da energia:**
  - A unidade dentro do campo é "{moeda}/kWh", por exemplo "BRL/kWh".
  - Embaixo vai `t.tarifaAjuda`, em 13 px, cor `#5E5A52`.
  - A nota do país (México) aparece embaixo, numa caixa com fundo `#FBE7B8`, cantos 10 px,
    padding 10 × 12 px e texto de 13 px.

**Coluna direita — resultado:**
- Fundo `#1B1A17`, padding de 40 px e 28 px entre os blocos.
- **Etiqueta:** raio de 18 px + "RESULTADO" (pt) ou "RESULT" (en), 14 px, peso 600,
  maiúsculas, letras 0.08em, cor `#C9C2B3`.
- **Valor do mês** (é o `aria-live`):
  - "Por mês" em 16 px, cor `#C9C2B3`;
  - o valor em Plex Mono 600, 64 px, altura de linha 1, cor `#F2B53A`;
  - quando os campos estão inválidos, aparece "—" e embaixo `t.preenchaOsCampos` em 15 px.
- **3 caixas lado a lado:**
  - Cada caixa tem borda `#3A3833`, cantos 14 px, padding 16 px e 12 px entre elas.
  - O rótulo tem 14 px, cor `#C9C2B3`; o valor é Plex Mono 22 px, peso 600.
  - As caixas são: **{rótulo unitário}** (a função `rotuloCustoUnitario`: "Por hora de uso",
    "Por uso de 5 min", "Por banho de 10 min"), **Por dia** e **Por ano**.
- **Consumo:**
  - Uma linha com "Consumo por mês" à esquerda e "{kWh} kWh" à direita (Plex Mono, cor
    `#F6F3EC`).
  - Embaixo, uma barra de 10 px de altura com trilho `#3A3833` e preenchimento `#F2B53A`.
    A largura é `min(100%, kWhMês ÷ 300 × 100%)`.
  - Embaixo da barra, "0" e "300 kWh" em 12 px, Plex Mono, cor `#9A937F`.
  - A barra tem `aria-hidden="true"`: o número já está no texto.
- **Rodapé do painel:**
  - Fica no fim (`margin-top: auto`), com borda superior `#3A3833`, 18 px de espaço acima e
    texto de 13 px, cor `#C9C2B3`.
  - O texto é `t.avisoEstimativa` + " Tarifa: {fonte.nome}, atualizada em {data}."
    (en: " Rate: {fonte.nome}, updated {data}.")
  - A fonte e a data vêm do país escolhido em `tarifas.ts`. A data sai no formato local
    (pt 28/09/2026; en 9/28/2026) e usa `timeZone: "UTC"`, como já é feito na inicial.

**Celular** (`Mobile.dc.html`) — um bloco só, com margem de 16 px, cantos 18 px e borda
`#1B1A17`:
- **Formulário:** padding de 20 px e 18 px entre os campos.
  - A ordem é: País, Potência + chips (44 px de altura), e depois uma grade de 2 colunas com
    Tempo e Preço (a unidade do preço é o símbolo: "R$").
  - Embaixo vem a ajuda da tarifa.
- **Resultado:** padding de 22 × 20 px e 16 px entre os blocos.
  - "Por mês" com o valor em 44 px.
  - Grade de 2 caixas: Por dia e Por ano (valor de 20 px).
  - Duas linhas finas: "{rótulo unitário} ... valor" e "Consumo por mês ... kWh".
  - Barra de 8 px.
  - Aviso em 12 px, com a fonte e a data.

### 4.3 Espaço do anúncio

- 1120 × 110 px, 56 px acima, borda tracejada de 1 px `#BDB4A1` e cantos 14 px.
- O texto é "ESPAÇO DO ANÚNCIO (ADSENSE)", 13 px, letras 0.08em, cor `#5E5A52`.
- No celular: 100 px de altura, cantos 12 px e o texto "ESPAÇO DO ANÚNCIO".
- É um componente `EspacoAnuncio` reaproveitado na inicial. Na task 23 ele recebe o anúncio
  de verdade.

### 4.4 Calcule outros aparelhos (novo)

- 72 px acima (36 px no celular).
- **Título:** h2 em Fraunces 600, 36 px (26 px no celular): "Calcule outros aparelhos" /
  "Calculate other appliances".
- **Frase ao lado** (só no computador, alinhada à direita e na base do título): "A potência
  típica de cada um já vem preenchida" / "Typical power is already filled in", 15 px, cor
  `#5E5A52`.
- **Computador:** grade de 4 colunas com 16 px entre os cartões, e **todos** os aparelhos do
  idioma. Cada cartão é um link para a página do aparelho:
  - altura mínima de 88 px, padding 20 px, cantos 16 px, borda `#DDD6C8`, fundo `#FFFDF8`;
  - o ícone fica num quadrado de 48 × 48, cantos 12 px, fundo `#F1ECE1`, ícone de 22 px;
  - ao lado, o nome curto (17 px, peso 600) e embaixo o rótulo da potência (Plex Mono 14 px,
    cor `#5E5A52`);
  - ao passar o mouse, a borda fica `#1B1A17`.
- **O aparelho da página atual** aparece destacado: fundo `#FBE7B8`, borda `#1B1A17`, e o
  quadrado do ícone com fundo `#1B1A17` e ícone `#E8A317`. Ele continua sendo link, com
  `aria-current="page"`.
- **Celular:**
  - Grade de 2 colunas com **4 aparelhos**, sem o atual: os 4 primeiros da lista
    tirando ele.
  - Cada cartão tem padding de 16 px, cantos 14 px, ícone de 40 × 40, nome em 15 px e
    potência em 13 px, um embaixo do outro.
  - Embaixo, o botão "Ver todos os aparelhos" / "See all appliances": 48 px de altura, borda
    `#1B1A17`, cantos 12 px, peso 600, levando para `/{idioma}#aparelhos`.
- **Componente:** `OutrosAparelhos`, que recebe `idioma` e `slugAtual`. Os ícones são os
  mesmos da inicial (mover `ICONE_POR_APARELHO` para um arquivo compartilhado, por exemplo
  `lib/icones.ts`).

### 4.5 Dicas (novo)

- 72 px acima.
- **Título:** h2 em 36 px (26 px no celular), com o texto `conteudo.tituloDicas` (seção 9).
- **Computador:** 3 cartões em grade de 3 colunas, 16 px entre eles.
  - Cada cartão tem fundo `#FFFDF8`, borda `#DDD6C8`, cantos 16 px, padding 28 px e 12 px entre
    os elementos.
  - O ícone fica num quadrado de 44 × 44, cantos 12 px, fundo `#FBE7B8`.
  - O título é h3 de 19 px e o texto tem 16 px, cor `#5E5A52`, altura de linha 1.55.
- **Celular:** um cartão embaixo do outro, padding de 18 px, cantos 14 px, título 16 px peso 600,
  texto 15 px e **sem ícone**.
- **Ícones** (lucide), na ordem das 3 dicas: `Gauge`, `Clock` e `Power` para a maioria dos
  aparelhos. Cada dica pode ter seu próprio ícone no conteúdo (seção 9).
- **Dados:** `conteudo.dicas` (3 itens) e `conteudo.tituloDicas`.

### 4.6 Texto + perguntas frequentes

- **Computador:** 2 colunas com 64 px de espaço, alinhadas em cima, 72 px acima e 96 px abaixo.
  **Celular:** o texto primeiro, e as perguntas embaixo.
- **Esquerda — texto:**
  - h2 `conteudo.tituloTexto` em 36 px (26 px no celular).
  - Depois vêm os parágrafos de `conteudo.textoApoio`, **menos** o parágrafo que começa com
    "**Para gastar menos" / "**To spend less" (ele virou as dicas da 4.5). Para isso, **tirar
    esse parágrafo dos arquivos de conteúdo**, em vez de filtrar em tempo de execução.
  - Os parágrafos têm 17 px (16 px no celular), altura de linha 1.65, cor `#3D3A34`, com
    18 px entre eles. O negrito continua com `TextoComNegrito`.
- **Como a conta é feita:**
  - h3 em Fraunces 26 px: "Como a conta é feita" / "How the math works".
  - Embaixo, uma caixa com fundo `#FFFDF8`, borda `#DDD6C8`, cantos 14 px, padding 20 × 22 px,
    Plex Mono 16 px (13 px no celular) e altura de linha 1.7, com 3 linhas:
  - **horas**, pt:
    `custo por dia = (watts ÷ 1000) × horas × preço do kWh` /
    `por mês = por dia × 30,4` / `por ano = por dia × 365`
  - **minutos**, pt:
    `custo por uso = (watts ÷ 1000) × (minutos ÷ 60) × preço do kWh` /
    `por mês = por dia × 30,4` / `por ano = por dia × 365`
  - **en:** `cost per day = (watts ÷ 1000) × hours × price per kWh` /
    `per month = per day × 30.4` / `per year = per day × 365`, e para minutos
    `cost per use = (watts ÷ 1000) × (minutes ÷ 60) × price per kWh`.
- **Direita — perguntas:**
  - h2 "Perguntas frequentes" / "Frequently asked questions", em 36 px.
  - A lista tem borda superior `#DDD6C8`. Cada pergunta é um `<details>` com borda inferior e
    18 px em cima e embaixo (14 px no celular).
  - **A primeira vem aberta**.
  - O `<summary>` tem 18 px (16 px no celular), peso 600, altura mínima de 44 px e uma seta
    `ChevronDown` à direita, que gira 180° quando abre. Sem o marcador padrão do navegador.
  - A resposta tem 16 px (15 px no celular), cor `#5E5A52`, com 10 px de espaço acima.
  - Usar `<details>`/`<summary>` do HTML (funciona sem JavaScript e com export estático).

## 5. Variações por aparelho — `CalcChuveiro.dc.html` e `CalcGeladeira.dc.html`

A estrutura é a mesma da seção 4. O que muda:

**Aparelhos em minutos** (chuveiro e chaleira):
- O rótulo do tempo é "Minutos de uso por dia", com "min/dia" e os chips de `atalhosTempo`.
- A primeira caixa do resultado é o custo por uso, com o rótulo dinâmico ("Por banho de
  {n} min" no chuveiro, "Por uso de {n} min" na chaleira). Já existe em `rotuloCustoUnitario`.
- No chuveiro, o rótulo da potência é "Potência do chuveiro".
- **Notas embaixo dos campos** (13 px, cor `#5E5A52`, novas em `aparelhos.ts` ou no conteúdo,
  pt/en):

| Aparelho | Embaixo da potência | Embaixo do tempo |
|---|---|---|
| chuveiro (pt) | "A potência muda com a chave de temperatura. Veja na etiqueta do chuveiro." | "Um banho por pessoa. Para a casa toda, some os minutos de todo mundo." |
| chaleira (pt) | "A potência vem na base da chaleira ou na caixa." | "Somando todas as vezes que você ferve água no dia." |
| chaleira (en) | "The wattage is on the kettle's base or box." | "Add up every time you boil water in a day." |

**Geladeira:**
- O rótulo da potência é "Potência média" / "Average power".
- **Caixa de explicação** entre a potência e o tempo:
  - fundo `#F1ECE1`, cantos 14 px, padding 16 px;
  - à esquerda, o ícone `Info` de 18 px; à direita, o título em 16 px peso 600 e o texto em
    15 px, cor `#5E5A52`.
  - pt: "Por que 50 W e não o valor da etiqueta?" — "O motor da geladeira liga e desliga o dia
    todo. A etiqueta mostra a potência só com o motor ligado. Aqui usamos a média de 24 horas,
    que é o que chega na conta. Colocar o valor da etiqueta deixa o resultado bem maior que o
    real."
  - en: "Why 50 W and not the label value?" — "A fridge's compressor turns on and off all day.
    The label shows the power only while it runs. Here we use the 24-hour average, which is
    what shows up on your bill. Using the label value makes the result much higher than it
    really is."
- **Embaixo do tempo:** pt "Geladeira fica ligada o tempo todo, então já vem 24 h." / en "A
  fridge runs all the time, so it starts at 24 h."
- **Aviso do resultado:** pt "Valores estimados. O custo real depende do modelo, da idade da
  geladeira e da sua tarifa." / en "Estimated values. The real cost depends on the model, the
  fridge's age and your rate."

**Como guardar:** campos opcionais novos por aparelho e idioma:
- `rotuloPotencia`;
- `notaPotencia`;
- `notaTempo`;
- `explicacao: { titulo, texto }`;
- `avisoResultado`.

Quando não houver, usar o texto padrão. Guardar tudo junto do conteúdo do aparelho
(`src/content/aparelhos/<idioma>/<slug>.ts`), porque depende do idioma.

## 6. Página inicial — `Inicio.dc.html` e `MobileInicio.dc.html`

### 6.1 Topo (hero)

- Duas colunas iguais com 56 px entre elas, 64 px acima e alinhadas no centro.
- **Esquerda:**
  - Selo "Grátis, sem cadastro" com o ícone do raio de 18 px, fundo `#FBE7B8`, arredondado 999,
    padding 6 × 14 px, 14 px peso 600.
  - h1 em Fraunces 600, 64 px (38 px no celular), altura de linha 1.02, letras -0.02em.
  - Subtítulo de 19 px (16 px no celular), cor `#5E5A52`.
  - Dois botões de 52 px de altura, padding 0 22 px e cantos 12 px:
    - "Calcular agora": fundo `#1B1A17`, texto `#F6F3EC`;
    - "Escolher aparelho": borda `#1B1A17`.
- **Direita — calculadora compacta** (novo componente `CalculadoraCompacta`, que substitui
  a `CalculadoraGenerica` + `Calculadora` usadas hoje na inicial):
  - O bloco tem borda `#1B1A17`, cantos 20 px, a sombra da seção 1 e `overflow: hidden`.
  - **Formulário:** fundo `#FFFDF8`, padding 28 px e 18 px entre as linhas.
    - **Linha 1:** grade de 2 colunas com 14 px de espaço.
      - **Aparelho** (select): "Outro / personalizado" + os aparelhos **em horas** do idioma
        (os de minutos ficam fora, porque têm página própria).
      - **País** (select): igual ao da página de aparelho.
    - **Linha 2:** grade de 3 colunas.
      - Potência (com "W" dentro).
      - Horas por dia (com "h" dentro).
      - Preço do kWh (com o símbolo da moeda dentro: "R$", "US$", "£", "€"...).
    - Os campos têm 50 px de altura.
    - **Vem preenchido:** "Outro / personalizado", 1000 W, 4 h e a tarifa do país (**nunca
      vazio**).
    - Escolher um aparelho preenche a potência e as horas dele (`potenciaWatts` e
      `tempoPadrao`).
  - **Resultado:** fundo `#1B1A17`, padding 24 × 28 px e 16 px entre os blocos, **empilhado**:
    - em cima, "Por mês" (14 px, `#C9C2B3`) e o valor em Plex Mono 600, 44 px, `#F2B53A`;
    - embaixo, grade de 3 caixas (Por hora, Por dia e Por ano): borda `#3A3833`, cantos 12 px,
      padding 10 × 12 px, rótulo de 13 px e valor em Plex Mono 17 px, peso 600, sem quebrar
      linha.
  - Usar a mesma validação e o mesmo cálculo (`criarCalculoSchema`, `calcularCusto`).
  - Com 1000 W, 4 h e R$ 1,05 o resultado tem que ser **R$ 127,75 por mês**, R$ 1,05 por
    hora, R$ 4,20 por dia e R$ 1.533,00 por ano.
- **Celular:** tudo numa coluna.
  - A calculadora fica com margem de 16 px e cantos 18 px.
  - O select Aparelho ocupa uma linha inteira. Embaixo vem a grade de 3 (potência, horas e
    preço), com rótulos de 13 px.
  - No resultado: "Por mês" em 42 px e uma linha "Dia R$ … · Ano R$ …" em 13 px.

### 6.2 Passos 01 / 02 / 03

- Já está feito. Conferir as medidas: 72 px acima, 3 colunas com 16 px de espaço, borda
  superior de 2 px `#1B1A17` e padding 24 px.
- O número fica em Plex Mono 28 px, peso 600, `#8A5A00`. O título é 19 px e o texto 16 px.

### 6.3 Anúncio

O mesmo `EspacoAnuncio` da 4.3, com 56 px acima.

### 6.4 Escolha um aparelho

- 72 px acima. h2 em Fraunces 40 px (28 px no celular) e a frase embaixo com 17 px.
- **Grade de 4 colunas** (2 no celular), com 16 px de espaço (10 px no celular).
- **Cada cartão:**
  - fundo `#FFFDF8`, borda `#DDD6C8`, cantos 18 px (14 px no celular), padding 24 px (16 px no
    celular), altura mínima de 180 px no computador;
  - o ícone fica num quadrado de 52 × 52, cantos 14 px, fundo `#F1ECE1`, ícone de 26 px;
  - no fim do cartão, o **nome curto** (19 px, peso 600) e o **rótulo da potência** (Plex Mono
    14 px).
- **Nomes curtos** (mudança: hoje o código usa `nomePt`/`nomeEn`, que são longos; criar
  `nomeCurtoPt`, `nomeCurtoEn` e `rotuloPotenciaPt`, `rotuloPotenciaEn` em `aparelhos.ts`):

| slugPt | nome curto pt | nome curto en | potência pt | potência en |
|---|---|---|---|---|
| pc | PC gamer | Gaming PC | 350 W | 350 W |
| pc-escritorio | PC escritório | Office PC | 100 W | 100 W |
| geladeira | Geladeira | Fridge | 50 W efetivo | 50 W average |
| ar-condicionado | Ar-condicionado | Air conditioner | 1000 W | 1000 W |
| ps5-xbox | PS5 / Xbox | PS5 / Xbox | 200 W | 200 W |
| aquecedor | Aquecedor | Space heater | 1500 W | 1500 W |
| chaleira | Chaleira elétrica | Electric kettle | 2000 W | 2000 W |
| chuveiro | Chuveiro elétrico | — (só pt) | 5500 W | — |

Os nomes curtos também servem para: a trilha (4.1), "Calcule outros aparelhos" (4.4), o rodapé
(3) e os selects de aparelho (6.1). Os nomes longos continuam onde já são usados (metadata, se
for o caso).

### 6.5 De onde vem o preço da energia

- Já está feito e está **melhor que o design**, porque mostra os 8 países. Manter.
- Conferir: fundo `#1B1A17`, cantos 24 px, padding 48 × 56 px, 72 px acima e 80 px abaixo.
- h2 em Fraunces 36 px. Cada país fica numa caixa com borda `#3A3833`, cantos 14 px e padding
  14 × 16 px, com o valor em Plex Mono `#F2B53A`.
- A data vem embaixo, em 13 px, cor `#9A937F`.

## 7. Celular — geral

- Tudo com 16 px de margem nas laterais (390 px).
- **Alvo de toque mínimo de 44 px:** chips, links do rodapé, botão do menu e itens das
  perguntas.
- **Página de aparelho:** a mesma ordem da seção 4, com os ajustes de celular descritos em
  cada item.
- **Menu aberto:** `MobileMenu.dc.html`.

## 7b. Tela de 600 px e tablet (768 px) — `Tela600*.dc.html` e `Tablet*.dc.html`

| Parte | Celular (390) | Tela de 600 | Tablet (768) | Computador (1440) |
|---|---|---|---|---|
| Cabeçalho | 60 px, menu ☰ | 64 px, menu ☰, logo 34 px, nome 20 px | 73 px, menu completo (Aparelhos · Sobre · PT/EN) como no computador | 73 px |
| h1 aparelho | 34 px | 40 px | 48 px | 60 px |
| h1 inicial | 38 px | 44 px | 52 px | 64 px |
| Calculadora do aparelho | 1 coluna; horas e preço lado a lado | 1 coluna; País + Potência lado a lado; chips; Horas + Preço lado a lado; resultado embaixo | igual à de 600, com padding 32 px e mês em 56 px | 2 colunas (form | resultado) |
| Resultado | mês 44 px; 2 caixas (dia, ano) + linhas | mês 48 px; 3 caixas (unitário, dia, ano) | mês 56 px; 3 caixas | mês 64 px; 3 caixas |
| Outros aparelhos | 4 cartões 2×2 (ícone em cima) + "Ver todos" | 4 cartões 2×2 com ícone à esquerda + "Ver todos" | **todos** os aparelhos, 2 colunas, ícone à esquerda, atual destacado | todos, 4 colunas |
| Dicas | 1 coluna, sem ícone | 1 coluna, ícone de 40 px à esquerda | 3 colunas, ícone em cima | 3 colunas |
| Texto + perguntas | um embaixo do outro | um embaixo do outro, texto até 680 px | um embaixo do outro, texto até 680 px | lado a lado |
| Inicial — calculadora | Aparelho em linha inteira; grade de 3 | Aparelho + País lado a lado; grade de 3 | igual à de 600, padding 28 px | ao lado do texto do topo |
| Inicial — passos 01/02/03 | 1 coluna | 1 coluna | 3 colunas | 3 colunas |
| Inicial — grade de aparelhos | 2 colunas | 2 colunas | 3 colunas | 4 colunas |
| Inicial — tarifas | texto em cima, 2 colunas de países | texto em cima, 2 colunas de países | texto em cima, 2 colunas de países | texto à esquerda, países à direita |
| Rodapé | nome + linha de links | nome + frase + linha de links | nome + frase, depois 3 colunas (Aparelhos, Site, Idioma) | nome à esquerda, 3 colunas à direita |

Os números das pranchas de 600 e tablet são os mesmos das outras (R$ 44,71 no PC gamer e
R$ 127,75 na inicial).

## 8. Outras telas (Sobre, Contato, Privacidade, 404, Idioma)

- Sobre, Contato e Privacidade são da **task 19**. Quando for fazer, seguir `Sobre.dc.html`,
  `Contato.dc.html`, `Privacidade.dc.html` e as versões `Mobile*` delas.
- **Sobre:**
  - "Sobre o WattCheck";
  - cartão do autor **sem foto**, com "Fabricio Santuchi · Desenvolvedor front-end" e a
    frase dele (placeholder até ele escrever);
  - a tabela de fontes com uma linha por país: EUA (EIA), Reino Unido (Ofgem), Brasil
    (ANEEL), Portugal e Alemanha (Eurostat), Canadá (GlobalPetrolPrices), Austrália (Média
    nacional), México (CFE);
  - "Última conferência: {atualizadoEm das tarifas}".
- **404** (`global-not-found.tsx`) e **escolha de idioma** (`/`): conferir com
  `NotFound.dc.html` e `Idioma.dc.html` (nome WattCheck).
- **Continuam em aberto de propósito:** o e-mail de contato (depende do domínio), a data e os
  textos da Política de Privacidade, e o texto "Por que este site existe" da página Sobre.

## 9. Dados novos (conteúdo por aparelho)

### 9.1 Campos novos no `ConteudoAparelho` (`src/content/aparelhos/tipos.ts`)

```ts
tituloTexto: string;   // h2 da coluna de texto (4.6)
tituloDicas: string;   // h2 das dicas (4.5)
dicas: { titulo: string; texto: string; icone?: "gauge" | "clock" | "power" | "thermometer" | "droplet" | "door" | "tv" }[]; // exatamente 3
// opcionais (seção 5):
rotuloPotencia?: string;
notaPotencia?: string;
notaTempo?: string;
explicacao?: { titulo: string; texto: string };
avisoResultado?: string;
```

E **remover** de `textoApoio` o parágrafo "**Para gastar menos…" / "**To spend less…", que
virou as dicas. O teste `conteudo.test.ts` precisa exigir `dicas.length === 3`, `tituloTexto`
e `tituloDicas` não vazios.

### 9.2 Títulos

| slugPt | tituloTexto pt | tituloDicas pt | tituloTexto en | tituloDicas en |
|---|---|---|---|---|
| pc | Quanto um PC gamer gasta | Como gastar menos com o PC | How much a gaming PC uses | How to spend less on your PC |
| pc-escritorio | Quanto um PC de escritório gasta | Como gastar menos com o computador | How much an office PC uses | How to spend less on your computer |
| geladeira | Quanto uma geladeira gasta | Como gastar menos com a geladeira | How much a fridge uses | How to spend less on your fridge |
| ar-condicionado | Quanto um ar-condicionado gasta | Como gastar menos com o ar | How much an air conditioner uses | How to spend less on air conditioning |
| ps5-xbox | Quanto um PS5 ou Xbox gasta | Como gastar menos com o console | How much a PS5 or Xbox uses | How to spend less on your console |
| aquecedor | Quanto um aquecedor gasta | Como gastar menos com o aquecedor | How much a space heater uses | How to spend less on heating |
| chaleira | Quanto uma chaleira gasta | Como gastar menos com a chaleira | How much a kettle uses | How to spend less with your kettle |
| chuveiro | Quanto um chuveiro elétrico gasta | Como gastar menos no banho | — | — |

### 9.3 Dicas (3 por aparelho; título — texto)

**PC gamer**
- pt:
  - Limite o FPS — Travar o jogo no que o seu monitor consegue mostrar evita que a placa de
    vídeo trabalhe à toa. (gauge)
  - Use a suspensão — Quando sair do computador, deixe ele dormir. Em suspensão o gasto cai
    para quase nada. (clock)
  - Desligue à noite — Se não precisa deixar nada baixando, desligar à noite corta horas de
    consumo que não servem pra nada. (power)
- en:
  - Cap your frame rate — Locking the game to what your monitor can show keeps the graphics
    card from working for nothing. (gauge)
  - Use sleep mode — When you step away, let it sleep. In sleep mode it uses almost nothing.
    (clock)
  - Shut down at night — If nothing needs to download, shutting down at night cuts hours of
    use that do nothing for you. (power)

**PC de escritório**
- pt:
  - Tela e suspensão automáticas — Configure a tela para apagar e o PC para dormir depois de
    alguns minutos parado. (clock)
  - Desligue no fim do dia — Em vez de deixar ligado até o dia seguinte. (power)
  - Notebook gasta menos — Se for trocar de máquina, um notebook costuma gastar menos que um PC
    de mesa. (gauge)
- en:
  - Auto screen-off and sleep — Set the screen to turn off and the PC to sleep after a few idle
    minutes. (clock)
  - Shut down at the end of the day — Instead of leaving it on until the next morning. (power)
  - Laptops use less — If you're replacing it, a laptop usually uses less than a desktop.
    (gauge)

**Geladeira**
- pt:
  - Longe do calor — Não deixe colada na parede nem perto do fogão. (thermometer)
  - Porta fechada — Abra menos vezes e por pouco tempo, e confira se a borracha veda bem.
    (door)
  - Nada quente lá dentro — Espere a comida esfriar antes de guardar. (clock)
- en:
  - Keep it away from heat — Don't push it against the wall or next to the stove.
    (thermometer)
  - Keep the door shut — Open it less often and briefly, and check that the seal is tight.
    (door)
  - Nothing hot inside — Let food cool down before putting it away. (clock)

**Ar-condicionado**
- pt:
  - 23 °C ou mais — Quanto mais perto da temperatura de fora, menos o aparelho trabalha.
    (thermometer)
  - Filtro limpo, porta fechada — Limpe o filtro com frequência e feche portas e janelas.
    (door)
  - Use o timer — Programe para desligar de madrugada. (clock)
- en:
  - Around 24–26 °C (75–78 °F) — The closer to the outside temperature, the less the unit
    works. (thermometer)
  - Clean filter, closed room — Clean the filter often and keep doors and windows closed.
    (door)
  - Use the timer — Set it to switch off in the early morning. (clock)

**PS5 / Xbox**
- pt:
  - Desligue de verdade — Se não precisa baixar nada, desligar gasta menos que o modo de
    repouso. (power)
  - Modo de economia — No Xbox, prefira o modo de economia de energia ao "ligar instantâneo".
    (gauge)
  - Lembre da TV — A TV pode gastar tanto quanto o console. Desligue quando parar de jogar.
    (tv)
- en:
  - Turn it fully off — If nothing needs to download, fully off uses less than rest mode.
    (power)
  - Energy-saving mode — On Xbox, choose energy-saving over "instant-on". (gauge)
  - Remember the TV — The TV can use as much as the console. Turn it off when you stop
    playing. (tv)

**Aquecedor**
- pt:
  - Só o cômodo onde você está — Aqueça só onde está, com a porta fechada. (door)
  - Potência mais baixa e timer — Use a potência menor quando der e o timer para não deixar
    ligado a noite toda. (clock)
  - Vede as frestas — Portas e janelas com frestas deixam o calor escapar. (thermometer)
- en:
  - Only the room you're in — Heat only where you are, with the door closed. (door)
  - Lower setting and a timer — Use the lower setting when you can and a timer so it doesn't
    run all night. (clock)
  - Seal the gaps — Gaps around doors and windows let the heat escape. (thermometer)

**Chaleira**
- pt:
  - Só a água que vai usar — Ferver a chaleira cheia para uma xícara gasta várias vezes mais.
    (droplet)
  - Tire o calcário — O calcário no fundo atrasa o aquecimento. (gauge)
  - Não ferva de novo — Água que acabou de ferver não precisa ferver outra vez. (power)
- en:
  - Only the water you need — Boiling a full kettle for one cup uses several times more.
    (droplet)
  - Descale it — Limescale slows heating. (gauge)
  - Don't reboil — Water that just boiled doesn't need boiling again. (power)

**Chuveiro** (só pt)
- Banho mais curto — O tempo é o que mais pesa: cada minuto a menos conta. (clock)
- Posição verão — Nos dias quentes, use a posição verão, que gasta menos. (thermometer)
- Desligue ao se ensaboar — Fechar o chuveiro enquanto se ensaboa corta minutos de consumo.
  (droplet)

**Ícones lucide para `icone`:**
- gauge → `Gauge`
- clock → `Clock`
- power → `Power`
- thermometer → `Thermometer`
- droplet → `Droplet`
- door → `DoorClosed`
- tv → `Tv`

## 10. Números para conferir (tarifa do Brasil, R$ 1,05)

| Tela | Entrada | Por mês | Unitário | Por dia | Por ano | kWh/mês |
|---|---|---|---|---|---|---|
| /pt/pc | 350 W, 4 h | R$ 44,71 | R$ 0,37/h | R$ 1,47 | R$ 536,55 | 42,6 |
| /pt/geladeira | 50 W, 24 h | R$ 38,33 | R$ 0,05/h | R$ 1,26 | R$ 459,90 | 36,5 |
| /pt/chuveiro | 5500 W, 10 min | R$ 29,28 | R$ 0,96/banho | R$ 0,96 | R$ 351,31 | 27,9 |
| /pt (inicial) | 1000 W, 4 h | R$ 127,75 | R$ 1,05/h | R$ 4,20 | R$ 1.533,00 | — |
