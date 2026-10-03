@AGENTS.md

@docs/design/README.md

# Calculadora de Custo de Energia — Regras do Projeto

## COMO TRABALHAR COMIGO (leia isso primeiro, sempre)

- Antes de sugerir algo, pense nos casos de borda (vazio, zero, negativo, vírgula,
  limites) e me diga quais considerou.
- Quando revisar meu código, explique o PORQUÊ de cada problema e aponte riscos,
  não só o que está errado.
- Se uma decisão tiver mais de um caminho, me mostre as opções com prós e contras
  antes de seguir.
- Eu estou aprendendo. NÃO escreva o código completo pronto pra mim, mesmo que pareça mais rápido.
- Sempre explique o conceito antes, me diga o que fazer e por quê, e me deixe escrever o código.
- Só escreva código por mim se eu pedir explicitamente ("pode escrever esse trecho").
- Depois que eu escrever algo, revise e aponte erros — não corrija silenciosamente.
- Trabalhe em TASKS pequenas: uma coisa por vez. Depois de cada task, me diga como testar/validar
  antes de seguir pra próxima. Não pule etapa nem faça várias tasks de uma vez.
- Se eu sugerir algo fora do escopo da v1 (ver abaixo), me avise e sugira guardar pra V2 em vez
  de simplesmente implementar.
- No fim de cada task, me lembre de fazer um commit com mensagem clara (ex: "feat: função de cálculo").
- Mensagem de commit descreve só O QUE mudou e por quê, de forma impessoal (ex: "fix: atualiza a
  data das tarifas pra hoje"). Nunca citar pessoas ("a pedido do Fabricio", "reportado por...")
  nem colocar assinatura/co-autoria de IA (Co-Authored-By, "Generated with").

## COMO ME ENSINAR (formato fixo, usar sempre)

Objetivo: eu entender rápido e FIXAR o que aprendi. Para cada passo de uma task:

1. **Onde e o quê, bem concreto.** Diga o arquivo exato, onde mexer (perto de qual linha ou
   função) e o que aquele pedaço precisa fazer, em 2–3 frases simples. Nada de explicação
   abstrata antes de eu saber onde estou.
2. **Esqueleto com lacunas.** Me dê a estrutura do trecho com os buracos marcados
   (`/* ??? */` ou `// TODO:` com uma pergunta que me guia). EU preencho as lacunas.
   As lacunas são a parte importante do aprendizado — não preencha por mim.
3. **Dicas em níveis, só se eu pedir.** "dica 1" = empurrão leve (qual conceito usar).
   "dica 2" = mais direta (qual função ou sintaxe). Só escreva a lacuna pronta se eu disser
   "pode escrever esse trecho".
4. **Revisão.** Quando eu colar o que fiz, aponte o que está certo, o que está errado e o
   PORQUÊ, em linguagem simples.
5. **Fixação no fim de cada task (curto).**
   - Resuma em até 3 linhas o que eu aprendi (os conceitos, não o código).
   - Me faça 1 pergunta rápida pra eu responder com minhas palavras
     (ex: "por que o useState e não uma variável normal aqui?").

Passos pequenos: no máximo um arquivo e uma ideia nova por vez.

## CONTEXTO DO PROJETO

Calculadora de custo de energia por aparelho ("quanto custa deixar isso ligado"), com foco
internacional (inglês primeiro — RPM de anúncio mais alto — depois português). Site 100%
estático, sem backend, sem banco de dados, hospedado grátis (Cloudflare Pages).
Objetivo: aprender construindo, gerar tráfego orgânico via SEO, monetizar com Google AdSense,
e usar como peça de portfólio.

Único custo previsto: domínio próprio (~US$10/ano), necessário pro AdSense — só na fase de
lançamento.

## STACK (travada, não trocar no meio)

- Next.js, App Router, `output: 'export'` (site estático)
- TypeScript em modo `strict`
- Tailwind CSS + shadcn/ui
- lucide-react (ícones)
- Zod (validação de formulário)
- Jest + React Testing Library (testes unitários e de componente)
- Playwright (testes ponta a ponta, poucos)
- ESLint (já vem com o Next)
- GitHub + GitHub Actions (rodar testes a cada push)
- Cloudflare Web Analytics (grátis, sem cookie)
- Sem backend, sem banco de dados, sem autenticação, sem CMS

## LIMITAÇÕES DO `output: 'export'` (lembrar sempre)

- `redirects`, `rewrites` e `headers` do next.config NÃO funcionam.
- Middleware NÃO funciona.
- O `i18n` do next.config NÃO funciona → idiomas são feitos com pasta de rota `app/[lang]/`
  - `generateStaticParams`.
- `next/image` precisa de `images: { unoptimized: true }` no next.config.
- Por isso a raiz `/` precisa ser uma página de verdade (não dá pra redirecionar no servidor).

## DECISÕES DE REGRA DE NEGÓCIO (fixas, usar igual no código e nos testes)

- Mês = 365 / 12 = 30,4167 dias. Ano = 365 dias.
- Fórmula: custo diário = (watts / 1000) × horas por dia × tarifa por kWh.
- Horas por dia: aceita decimal, mínimo 0, máximo 24.
- Potência: maior que 0, máximo 10000 W.
- Tarifa: maior que 0, máximo 99999.
- A função de cálculo NÃO conhece moeda — só recebe e devolve números. Quem mostra o
  símbolo (R$, £, US$) e formata é a interface, usando `Intl.NumberFormat` com o idioma e a moeda.
- Em português o usuário pode digitar com vírgula ("0,75"). Converter pra número antes da
  validação do Zod (função própria de parsing, testada).
- Sempre mostrar aviso: "Valores estimados. O custo real depende do aparelho e da sua tarifa."
- Unidade de tempo por aparelho: HORAS (padrão) ou MINUTOS (chuveiro e chaleira). Cada aparelho
  no arquivo de dados tem `unidadeTempo: 'horas' | 'minutos'`. A função de cálculo recebe SEMPRE
  horas; quem converte minutos ÷ 60 é a interface. Minutos: 0 a 1440.
- Resultado mostra: por mês (destaque), por hora de uso, por dia, por ano e kWh por mês.
  Custo por hora de uso = (watts / 1000) × tarifa. Em aparelho de minutos, no lugar de "por hora"
  mostrar "por uso" (chuveiro: banho de 10 min; chaleira: 5 min).
- Cálculo AO VIVO: o resultado atualiza enquanto a pessoa digita. NÃO existe botão "Calcular"
  nem `onSubmit`. O "Calcular agora" da página inicial é só um link que rola até a calculadora
  (`href="#calc"`), não calcula nada.
- Campo vazio ou inválido: o painel mostra "—" em todos os valores e a frase "Preencha potência,
  tempo de uso e preço pra ver o custo." NUNCA mostrar R$ 0,00 por causa de erro.
- O bloco do resultado tem `aria-live="polite"` (leitor de tela anuncia quando muda).
- País padrão pelo idioma da rota: `/en` → EUA, `/pt` → Brasil. Depois de montar a página, pode
  tentar `navigator.language` (ex: en-GB → Reino Unido), sempre com o dropdown pra trocar.
  Cuidado: `navigator` só existe no navegador, não no build estático.
- Geladeira: potência média de 50 W e 24 h já preenchidas, com nota explicando por que não usar
  o valor da etiqueta (o motor liga e desliga).
- Todo aparelho tem `tempoPadrao` (obrigatório), pra calculadora já abrir preenchida e com
  resultado. Sugestão: PC gamer 4 h, PC escritório 8 h, geladeira 24 h, ar-condicionado 8 h,
  PS5/Xbox 3 h, aquecedor 6 h, chaleira 5 min, chuveiro 10 min.
- Cada aparelho tem 3 botões de potência pronta (ex: PC 100 / 350 / 600 W) e, nos de minutos,
  botões de tempo (ex: chuveiro 5 / 10 / 20 / 40 min).

## VISUAL (referência: canvas "Calculadora de Energia — Visual")

- Seguir as telas do canvas. Estilo: "conta de luz bem feita".
- **Versão definitiva das telas (28/09/2026): `docs/design/ESPEC-TELAS.md`.** Ela vale mais que
  tudo desta seção e que os `.dc.html`. Tem 4 tamanhos: celular 390, tela de 600, tablet 768 e
  computador 1440.
- Cores: papel #F6F3EC (fundo), cartão #FFFDF8, tinta #1B1A17 (texto, painel de resultado,
  rodapé), texto suave #5E5A52, borda #DDD6C8, borda de campo #CFC7B6, âmbar #E8A317 (marca e
  foco), âmbar claro #F2B53A (números no painel escuro), âmbar fundo #FBE7B8 (item ativo),
  bege #F1ECE1 (fundo de ícone), erro #A3261B.
- Âmbar NUNCA como texto sobre fundo claro (contraste 2:1).
- Fontes (Google Fonts via `next/font`): Fraunces 600 nos títulos, IBM Plex Sans no texto,
  IBM Plex Mono nos números.
- Cantos: campo 12px, card 16px, calculadora 20px, chip 999px. Espaçamento base 8.
  Conteúdo com 1120px de largura; no celular, margem de 16px. Alvo de toque mínimo 44px.
- Ícones: lucide-react.
- Cabeçalho e rodapé são componentes únicos (`<Header>` e `<Footer>`) usados em todas as páginas.
- Menu do cabeçalho: Aparelhos · Sobre · PT/EN. No celular, botão que abre o menu em tela cheia.
- Contato sem formulário (site estático não tem servidor): só o e-mail em destaque.

## ESCOPO DA V1 (só isso, nada além)

- Calculadora única: potência (watts) + tempo de uso (horas ou minutos, conforme o aparelho) +
  tarifa de energia → custo por hora de uso, diário, mensal e anual
- Tarifa padrão preenchida por país (dropdown com os 8 países da seção de dados) + campo editável
- Validação do formulário com Zod (sem número negativo, sem campo vazio, limites acima)
- Páginas por aparelho reusando o mesmo componente: PC gamer, PC escritório, geladeira,
  ar-condicionado, PS5/Xbox, aquecedor, chaleira elétrica
- Chuveiro elétrico: SÓ na versão em português (`/pt/chuveiro`), porque quase não tem busca
  em inglês. É a única exceção à regra de rotas espelhadas.
- Versão em inglês (prioridade) e português, mesma estrutura de rota (`/en/pc`, `/pt/pc`)
- Página raiz `/`: escolha de idioma simples (links pra /en e /pt)
- Página inicial de cada idioma (`/en`, `/pt`): calculadora genérica + lista de aparelhos
- Texto de apoio (300-500 palavras) + FAQ curto em cada página de aparelho, pra SEO
- Mostrar a fonte e a data da última atualização das tarifas no rodapé da calculadora

## SEO TÉCNICO (obrigatório na V1)

- `title` e `description` únicos por página (via `generateMetadata`)
- `hreflang` ligando cada página en ↔ pt (via `alternates.languages` no metadata)
- URL canônica em cada página (`alternates.canonical`)
- `<html lang="en">` / `<html lang="pt-BR">` correto em cada idioma
- `app/sitemap.ts` e `app/robots.ts` (funcionam no export estático)
- Open Graph (título, descrição, imagem) pra quando compartilharem o link
- Favicon
- Página 404 personalizada (`app/not-found.tsx`)
- Obs: o Google quase não mostra mais FAQ como resultado especial. O FAQ fica pelo conteúdo,
  não esperar destaque na busca.

## PÁGINAS E REQUISITOS PRO ADSENSE (fase de lançamento)

- Domínio próprio (AdSense não aceita subdomínio `.vercel.app` / `.pages.dev` na prática)
- Páginas em en e pt: Política de Privacidade (citar cookies do AdSense e o analytics),
  Sobre, Contato (pode ser só um e-mail)
- Aviso de consentimento de cookies com plataforma CERTIFICADA pelo Google — obrigatório pra
  mostrar anúncios na Europa e Reino Unido. Usar a ferramenta "Privacidade e mensagens" do
  próprio AdSense (grátis).
- Arquivo `public/ads.txt` (conteúdo vem do painel do AdSense)
- Só pedir aprovação depois que todas as páginas de aparelho estiverem no ar com texto.

## FORA DO ESCOPO (fica pra V2, não implementar agora)

- Mapa-múndi interativo / múltiplas APIs de tarifa em tempo real
- Login, histórico de cálculos, conta de usuário
- Comparação lado a lado de vários aparelhos na mesma tela
- Mais idiomas além de inglês/português
- Outras calculadoras no mesmo domínio
- Mais países no dropdown (só depois de ver de onde vem o tráfego)
- Consumo em standby (aparelho desligado mas na tomada)
- Modo escuro

## DADOS DE REFERÊNCIA (usar nos arquivos de dados, task 4)

Tarifas de energia padrão por país (kWh) — cada uma com código de moeda ISO. Valores
originais da task 4 (estimativas de início de projeto); **conferidos de verdade nas fontes
oficiais na task 22 (01/10/2026)** — valor final é o que está em `src/lib/data/tarifas.ts`:

- EUA: 0,16 USD → conferido: **0,18 USD** (EIA)
- Reino Unido: 0,28 GBP → conferido: **0,26 GBP** (Ofgem, muda a cada trimestre — teto)
- Brasil: 0,75 BRL → conferido: **1,05 BRL** (ANEEL, média com impostos — faixa real
  0,85–1,10, varia bastante por distribuidora e estado)
- Canadá: 0,13 CAD → conferido: **0,17 CAD** (GlobalPetrolPrices, com impostos)
- Portugal: 0,24 EUR → conferido: **0,24 EUR** (Eurostat — sem mudança)
- Alemanha: 0,40 EUR → conferido: **0,39 EUR** (Eurostat)
- Austrália: 0,30 AUD → conferido: **0,32 AUD** (sem órgão único nacional — faixa 31-35
  c/kWh entre estados, valor é uma média estimada)
- México: 2,50 MXN → conferido: **1,37 MXN** (CFE, tarifa 1 residencial, faixa
  intermediária — tarifa é por faixa de consumo, quanto mais gasta mais caro fica)

Potências típicas por aparelho (seção abaixo) também conferidas na task 22 contra faixas de
mercado reais (ex: ar-condicionado 9-12k BTU consome 700-1500W, chuveiro brasileiro
4500-7500W conforme a estação) — todas dentro do esperado, nenhuma mudou.

Potência típica por aparelho (watts):

- PC gamer (em uso): 350W
- PC escritório (em uso): 100W
- Geladeira (média, ciclo liga/desliga): 50W efetivo
- Ar-condicionado (split 9000-12000 BTU): 1000W
- PS5 / Xbox Series X (jogando): 200W
- Aquecedor elétrico: 1500W
- Chaleira elétrica: 2000W
- Chuveiro elétrico (só pt): 5500W

Tempo de uso e atalhos por aparelho:

- PC gamer: horas · potência 100 / 350 / 600 W
- Chuveiro: MINUTOS · potência 3500 / 5500 / 7500 W · tempo 5 / 10 / 20 / 40 min
- Chaleira: MINUTOS · tempo 3 / 5 / 10 min
- Geladeira: horas, 24 h pré-preenchidas, com nota dos 50 W
- Demais aparelhos: horas · definir os 3 atalhos de potência antes da task 13

Observação: valores estimados — conferir fonte antes do lançamento, não são de referência
oficial verificada.

## ESTRATÉGIA DE TESTES

| Camada        | O que testar                                                                                                                  | Ferramenta            |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| Unitário      | Função de cálculo: normal, zero, decimais, limites                                                                            | Jest                  |
| Unitário      | Parsing de número: "0,75", "0.75", "1.234,5", vazio, texto                                                                    | Jest                  |
| Unitário      | Formatação de moeda por idioma (R$ 1.234,56 / $1,234.56)                                                                      | Jest                  |
| Unitário      | Schema Zod: aceita válido, rejeita vazio/negativo/texto/acima do limite                                                       | Jest                  |
| Unitário      | Integridade dos dados: todo aparelho tem watts > 0, texto en/pt, `unidadeTempo` e 3 atalhos; todo país tem moeda e tarifa > 0 | Jest                  |
| Unitário      | Conversão de minutos: 10 min = 0,1667 h; chuveiro 5500W, 10 min, 0,75 → diário ≈ 0,69                                         | Jest                  |
| Unitário      | País padrão pelo idioma: `en` → EUA, `pt` → Brasil                                                                            | Jest                  |
| Componente    | Formulário mostra erro com inválido e resultado com válido; campo vazio mostra "—" (nunca 0,00)                               | Jest + RTL            |
| Ponta a ponta | `/en/pc` e `/pt/pc` calculam certo; 404 aparece em rota inexistente                                                           | Playwright            |
| Estático      | `tsc --noEmit` e `npm run lint` sem erro                                                                                      | TypeScript / ESLint   |
| Build         | `npm run build` gera `out/` sem erro                                                                                          | Next                  |
| Qualidade     | Lighthouse 90+ em Performance, Acessibilidade, SEO e Boas Práticas                                                            | Lighthouse            |
| Automação     | Lint + tipos + Jest + build rodando a cada push                                                                               | GitHub Actions        |
| Manual        | Celular real, tela larga, Chrome + Firefox/Safari, navegação só pelo teclado                                                  | Eu                    |
| SEO           | Sitemap enviado, páginas indexadas, hreflang sem erro                                                                         | Google Search Console |

Caso conhecido pra conferir na mão: PC de 300W, 8h/dia, tarifa 0,75 →
diário 1,80 / mensal ≈ 54,75 / anual 657,00 / por hora 0,23.
Caso em minutos: chuveiro 5500W, 10 min/dia, 0,75 → diário ≈ 0,69 / mensal ≈ 20,91 / anual ≈ 250,94.

## ONDE ESTAMOS (atualizado em 02/10/2026)

- Site no ar: https://wattcheck.santux.com.br (Cloudflare, deploy pelo push na `main`).
- Fases 1 a 6.5 feitas. Fase 7: tasks 18–22 feitas; Fase 7b (22a–22j) feita, falta só a 22k
  (decisão sobre robôs de IA, sem pressa) e confirmar a 22h no painel.
- Search Console cadastrado e sitemap enviado (22f). Cloudflare Web Analytics ativo.
- Ajustes de celular feitos em 02/10/2026 (fora da lista de tasks):
  - Bloco de tarifas da inicial: no celular o nome do país fica em cima e o valor embaixo
    (lado a lado o valor vazava da caixa); do tablet em diante, lado a lado.
  - Calculadora da inicial: unidade no rótulo ("Potência (W)", "Horas/dia", "R$ por kWh",
    com o símbolo da moeda do país) e não mais dentro do campo; as 3 colunas usam subgrid
    pra os campos ficarem alinhados mesmo quando um rótulo quebra em 2 linhas.
  - Imagem de compartilhamento (og:image/twitter:image) em todas as páginas, via
    `imagemCompartilhamento()` em `src/lib/site.ts`.
- README de portfólio (task 25) feito em 02/10/2026.
- **Próximo:** esperar ~1-2 semanas de indexação → task 23
  (AdSense) → task 24 (afiliados).

## TASKS, EM ORDEM (uma por vez, testar antes de avançar)

### Fase 1 — Base

0. **Repositório** — criar repo no GitHub, primeiro commit, `.gitignore` do Next.
   Validar: código aparece no GitHub.
1. **Configurar export estático** — `output: 'export'` e `images.unoptimized` no next.config,
   TypeScript `strict`. Validar: `npm run build` gera a pasta `out/` sem erro.
2. **Instalar shadcn/ui e Zod** — `npx shadcn@latest init` e instalar Zod.
   Validar: pacotes no `package.json`, `npm run dev` ainda roda.
3. **Configurar Jest + React Testing Library** — usar `next/jest`, criar um teste bobo que passa.
   Validar: `npm test` roda e passa.

### Fase 2 — Lógica (sem interface)

4. **Arquivos de dados** — `lib/data/tarifas.ts` (com moeda ISO e `atualizadoEm`) e
   `lib/data/aparelhos.ts` (com nome/slug en e pt, `unidadeTempo` e atalhos). Validar: teste de
   integridade dos dados passa.
5. **Função pura de cálculo** — `lib/calculo.ts`. Validar: testes Jest de casos normais,
   zero, decimais e o caso conhecido acima.
6. **Parsing e formatação** — `lib/numero.ts`: converter texto com vírgula/ponto em número e
   formatar moeda com `Intl.NumberFormat`. Validar: testes Jest da tabela acima.
7. **Schema Zod** — `lib/schema.ts` com os limites das regras de negócio. Validar: testes Jest
   de válido e inválido.

### Fase 3 — Interface

8. **Formulário da calculadora** — inputs de potência, tempo (horas ou minutos), tarifa +
   dropdown de país + botões de atalho, com labels acessíveis. Validar: valor inválido mostra
   erro, valor válido não trava, atalho preenche o campo.
9. **Conectar formulário ao cálculo** — mostrar mensal (destaque), por hora, diário, anual e
   kWh/mês formatados + aviso de estimativa + estado "—" quando inválido + `aria-live`.
   Cálculo ao vivo: remover o botão "Calcular" e o `onSubmit` da versão antiga.
   Validar: teste de componente (RTL) digitando e vendo o resultado mudar sem clicar em nada
   + os dois casos conhecidos na mão.
10. **Estilizar com Tailwind/shadcn** — seguir a seção VISUAL e as telas do canvas: cores no
    tema do Tailwind, fontes com `next/font`, `<Header>` e `<Footer>` como componentes.
    Validar: comparar lado a lado com o canvas, celular real e tela larga, teclado funciona.

### Fase 4 — Páginas e idiomas

11. **Estrutura de idiomas** — `app/[lang]/` com `generateStaticParams`, `<html lang>` certo,
    página raiz `/` com escolha de idioma, país padrão pelo idioma. Validar: build gera `/en` e
    `/pt`, e `/en` abre com EUA.
12. **Primeira página de aparelho completa** (PC gamer) — calculadora + texto + FAQ.
    Validar: carrega, calcula certo, Lighthouse 90+.
13. **Replicar pros outros aparelhos** em en e pt (chuveiro só pt). Validar: cada página
    calcula certo com seus valores padrão; teste de integridade confere que todas existem.
13b. **Página inicial** (`/pt` e `/en`) — seguir `Inicio.dc.html` e `MobileInicio.dc.html`:
    título + calculadora genérica (dropdown de aparelho que preenche a potência, com a opção
    "Outro / personalizado"), os 3 passos "como funciona", espaço do anúncio, grade com todos
    os aparelhos linkando pras páginas da task 13, e o bloco escuro das tarifas. O botão
    "Calcular agora" só rola até a calculadora. Validar: cada card da grade abre a página certa
    nos dois idiomas; trocar o aparelho no dropdown preenche a potência; calcula ao vivo.

### Fase 5 — SEO técnico

14. **Metadata** — `generateMetadata` com title, description, canonical, hreflang, Open Graph.
    Validar: ver o código-fonte da página gerada em `out/` e conferir as tags.
15. **Sitemap, robots, 404 e favicon** — Validar: `out/sitemap.xml` lista todas as páginas,
    rota inexistente mostra a 404.

### Fase 6 — Qualidade e automação

16. **Playwright** — 2-3 testes ponta a ponta rodando contra o site buildado.
    Validar: `npx playwright test` passa.
17. **GitHub Actions** — workflow rodando lint, `tsc --noEmit`, Jest e build a cada push.
    Validar: check verde no GitHub.

### Fase 6.5 — Visual idêntico ao desenho (antes do deploy)

Tudo segue `docs/design/ESPEC-TELAS.md` (a "espec") e as pranchas em `docs/design/`.
**Exceção combinada em 28/09/2026:** nesta fase o Claude Code PODE escrever o código (o
Fabricio pediu). Depois de cada task: explicar no formato COMO ME ENSINAR, acrescentar a
explicação em `docs/mudancas-explicadas.md`, rodar `npm test`, `npx tsc --noEmit` e
`npm run build`, e fazer o commit. Não mexer na lógica testada (espec, seção 0).

V1. **Base** — cores novas como variáveis CSS, breakpoint `xs` (480 px), componente
    `EspacoAnuncio`, ícones num arquivo só (`lib/icones.ts`), nomes curtos e rótulos de potência
    em `aparelhos.ts` (espec 1, 4.3, 6.4). Validar: build ok e teste de dados cobrindo os nomes
    curtos.
V2. **Conteúdo novo** — `tituloTexto`, `tituloDicas`, `dicas` (3) e os campos opcionais em cada
    arquivo de conteúdo pt/en; tirar o parágrafo "Para gastar menos" (espec 5 e 9). Validar:
    `conteudo.test.ts` exige os campos novos.
V3. **Cabeçalho e rodapé** nos 4 tamanhos (espec 2, 3 e 7b). Validar: links do rodapé abrem as
    páginas certas em pt e en.
V4. **Página de aparelho no computador** — topo alinhado à esquerda com trilha e subtítulo,
    calculadora em 2 colunas (País → Potência → Tempo → Preço), painel de resultado com 3 caixas
    e barra, anúncio, `OutrosAparelhos`, dicas, texto + "Como a conta é feita" e perguntas em
    `<details>` (espec 4). Validar: `/pt/pc` com 350 W, 4 h e R$ 1,05 mostra R$ 44,71 (espec 10).
V5. **Variações** — aparelhos em minutos (chuveiro, chaleira) e geladeira: rótulos, notas,
    caixa "Por que 50 W" e aviso próprio (espec 5). Validar: `/pt/chuveiro` mostra "Por banho de
    10 min: R$ 0,96" e `/pt/geladeira` mostra R$ 38,33.
V6. **Página inicial** — `CalculadoraCompacta` já preenchida (1000 W, 4 h), resultado empilhado,
    cartões com nomes curtos (espec 6). Validar: R$ 127,75 por mês logo ao abrir `/pt`.
V7. **Responsivo** — celular 390, tela de 600, tablet 768 e computador, nas duas páginas
    (espec 4, 6, 7 e 7b). Validar: nada corta nem cria rolagem lateral de 360 a 1440 px.
V8. **Conferência lado a lado** — script Playwright que tira prints de `/pt`, `/pt/pc`,
    `/pt/chuveiro`, `/pt/geladeira` e `/en/pc` em 390, 600, 768 e 1440 px e salva em
    `docs/design/prints/` (fora do git se ficar pesado) para comparar com as pranchas; atualizar
    os testes e2e e unitários que mudaram de texto. Validar: prints batem com as pranchas,
    `npm test`, `npm run test:e2e` e CI verdes.

### Fase 7 — Deploy e lançamento

18. **Deploy inicial** ✅ — Cloudflare ligado ao GitHub (decisão de 01/10/2026: antes a
    opção era "Vercel ou Cloudflare Pages", mas o plano grátis da Vercel, o Hobby, **não
    permite uso comercial** — e o site vai ter AdSense e links de afiliado, então deixa de se
    enquadrar). Feito com Workers Static Assets (`wrangler.jsonc` servindo a pasta `out/`).
    Validar: link público funciona igual ao local.
19. **Páginas legais** ✅ — Privacidade, Sobre, Contato (en e pt). Validar: linkadas no rodapé.
20. **Domínio próprio** ✅ — comprar e apontar pro deploy. Decisão de 01/10/2026: vai ser o
    domínio "santux" do Fabricio, com o WattCheck como subdomínio
    (`wattcheck.santux.com.br`). E-mail de contato: `contato@wattcheck.santux.com.br` (Email
    Routing da Cloudflare). Validar: site abre no domínio com HTTPS.
21. **Search Console + analytics** ✅ — cadastrar domínio, enviar sitemap, ativar Cloudflare
    Web Analytics. Validar: sitemap aceito sem erro, visitas aparecendo.
22. **Conferir dados** ✅ — checar tarifas e potências nas fontes, atualizar `atualizadoEm`.
### Fase 7b — Ajustes da auditoria do site no ar (01/10/2026)

Achados conferindo https://wattcheck.santux.com.br. Fazer na ordem, uma por vez, ANTES da
task 23 (AdSense). Mesmas regras: testar, commitar, marcar como feita.

22a. **404 personalizada** ✅ — hoje rota inexistente devolve tela em branco: o `out/404.html`
    existe, mas o `wrangler.jsonc` não manda usar. Adicionar `"not_found_handling": "404-page"`
    dentro de `assets`. Validar: `/pt/naoexiste` no ar mostra a nossa 404 (status 404).
22b. **Frase da Privacidade** ✅ — o texto diz que visitantes da UE/Reino Unido "veem um aviso de
    consentimento", mas ele ainda não existe (vem na task 23). Tirar ou trocar por "quando os
    anúncios forem ativados" (pt e en). Validar: texto não promete o que não acontece.
22c. **Slugs em inglês nas páginas legais** ✅ — `/en/sobre`, `/en/contato`, `/en/privacidade` →
    `/en/about`, `/en/contact`, `/en/privacy` (pt continua igual). Ajustar rotas, links do
    Header/Footer, hreflang, sitemap e testes. Fazer antes do Google indexar. Validar: links
    funcionam nos dois idiomas, sitemap com os endereços novos.
22d. **Imagem Open Graph** ✅ — hoje o link compartilhado não tem imagem. Criar `opengraph-image`
    1200×630 (nome + cor do site), uma por idioma, e `twitter:card` = `summary_large_image`.
    Validar: tags `og:image` no HTML de `out/` e preview num validador de cartão.
22e. **`x-default` no hreflang** ✅ — só a raiz `/` tem. Colocar em todas as páginas apontando
    pra `/en`. Validar: tag presente no HTML de qualquer página em `out/`.
22f. **Search Console** ✅ (resto da task 21, eu faço no painel) — cadastrar o domínio
    `santux.com.br` (verificação pelo DNS da Cloudflare) e enviar
    `https://wattcheck.santux.com.br/sitemap.xml`. Validar: sitemap "Sucesso", páginas indexando.
22g. **Testar o e-mail de contato** ✅ — mandar e-mail pra `contato@wattcheck.santux.com.br`.
    Se não chegar, ativar Email Routing na Cloudflare. Validar: e-mail chega na minha caixa.
22h. **Deploy automático** ⏳ (provável: o site atualizou sozinho minutos depois do push de 02/10 — conferir no painel da Cloudflare se o projeto está ligado ao repositório do GitHub) — confirmar se o deploy é pelo Git (Workers Builds) ou `wrangler
    deploy` na mão. Se for na mão, ligar o Git no painel da Cloudflare. Validar: push na main
    publica sozinho.
22i. **Pacote `cn`** ✅ (é o pacote oficial do shadcn, repositório `shadcn-ui/cn` — substitui `clsx` + `tailwind-merge`; nada a mudar) — os componentes do shadcn importam `cn` de um pacote npm `cn`, e não de
    uma função própria em `lib/utils.ts` (padrão do shadcn com `clsx` + `tailwind-merge`).
    Conferir se é o pacote certo ou foi instalado por engano. Validar: build e testes passam.
22j. **Limpeza** ✅ — apagar os comentários "Placeholder" velhos do `src/lib/site.ts`; configurar
    `git config user.email` com o e-mail do GitHub (commits aparecerem no perfil); marcar as
    tasks 18–22 como feitas aqui; atualizar as tarifas antigas da seção "Dados de referência"
    com os valores da task 22.
22k. **Robots da Cloudflare (decidir, sem pressa)** — o robots.txt gerenciado pela Cloudflare
    libera o Google mas bloqueia robôs de IA, inclusive ChatGPT/Perplexity buscando pra
    responder alguém. Por ora fica. Se quiser tráfego vindo dessas IAs, desligar em Cloudflare →
    Security → Bots.

23. **AdSense** — pedir aprovação; depois de aprovado: `ads.txt`, mensagem de consentimento
    (Europa/Reino Unido) e blocos de anúncio. Validar: anúncios aparecem, Lighthouse continua
    90+ em Performance.

24. **Links de afiliado** (Mercado Livre e Amazon) — só depois do site no ar e com conteúdo
    (os programas exigem isso pra aprovar). Cadastro: Programa de Afiliados do Mercado Livre e
    Amazon Associados Brasil (páginas pt); Amazon Associates EUA (páginas en, cadastro
    separado; Mercado Livre não serve fora da América Latina). Conferir as regras de cada
    programa na hora do cadastro (a Amazon costuma encerrar contas sem venda nos primeiros
    meses). Código: campo opcional `afiliados` por aparelho e idioma nos dados (nome do
    produto, loja, url, motivo curto); componente `ProdutosRecomendados` na página do aparelho,
    abaixo da calculadora; links com `rel="sponsored nofollow noopener"` e `target="_blank"`;
    aviso de afiliado visível perto dos links e na Privacidade. Produto que combina com todas
    as páginas: medidor de tomada (wattímetro), que os textos já recomendam. Exemplos por
    página: ar inverter, aquecedor com termostato, chaleira, lâmpada LED, tomada inteligente.
    Validar: links abrem a loja certa por idioma, aviso aparece, Lighthouse continua 90+.

Depois da task 24, a v1 está pronta — aí entra a fase de observar tráfego (Search Console e
analytics) por algumas semanas antes de começar a Fase 8.

### Fase 8 — Crescimento (depois da v1 no ar, em ordem de prioridade)

Ideias aprovadas em 28/09/2026. Mesma regra: uma task por vez, testar antes de avançar. Textos
novos de aparelho seguem o mesmo fluxo (rascunho num documento, eu reviso, depois entra no
código).

25. **README de portfólio** ✅ — print do site, link do site no ar, nota do Lighthouse, selo do
    GitHub Actions (testes passando), stack e as decisões técnicas principais (export
    estático, cálculo ao vivo, rota dinâmica, testes). Pode ser feita a qualquer momento
    depois da task 18. Validar: README abre bonito no GitHub e explica o projeto em 1 minuto.
26. **Mais páginas de aparelho** — só dados + texto, a rota dinâmica já cuida do resto.
    Prioridade: air fryer, TV, ventilador, micro-ondas, máquina de lavar, ferro de passar,
    freezer, lâmpada, carregador de celular (o que for só do Brasil fica só em pt, como o
    chuveiro). Cada um com `tempoPadrao`, atalhos, texto pt/en e FAQ. Validar: páginas no
    sitemap, testes de dados e de conteúdo cobrindo os novos.
27. **Bandeira tarifária (só Brasil)** — seletor verde, amarela, vermelha 1 e vermelha 2 que
    soma o adicional por kWh na tarifa. Valores num arquivo de dados com fonte (ANEEL) e
    `atualizadoEm`, porque mudam. Validar: testes do cálculo com cada bandeira; o seletor só
    aparece quando o país é Brasil.
28. **Quanto economiza se trocar** — nas páginas onde faz sentido (ar comum → inverter,
    lâmpada comum → LED, geladeira velha → nova), mostrar a economia estimada por mês e por
    ano com os valores digitados. Liga com a task 24 (afiliados). Validar: função pura
    testada; o texto deixa claro que é estimativa.
29. **Tarifa por distribuidora no Brasil** — dados da ANEEL por distribuidora (Enel, Cemig,
    Light, Copel etc.) com fonte e data; escolher a distribuidora na calculadora e páginas
    estáticas tipo `/pt/tarifa/<distribuidora>` ("quanto custa o kWh na ..."). Validar:
    páginas no sitemap, dados testados, data de atualização visível.
30. **Entrada pelo selo** (kWh/mês do Procel; kWh/ano do EnergyGuide e da etiqueta europeia)
    em vez de watts — principalmente geladeira e ar-condicionado. Validar: conversão testada
    (kWh/mês × 1000 ÷ 730 = W médio; kWh/ano ÷ 8,76 = W médio).
31. **Compartilhar resultado** — link com os valores na URL (query string lida no navegador,
    funciona com export estático) e botão copiar/compartilhar. Validar: abrir o link preenche
    a calculadora igual.
32. **Equivalências** — frase tipo "isso equivale a X banhos de 10 min" ou "X horas de
    ar-condicionado" embaixo do resultado. Validar: função pura testada, texto pt/en.
