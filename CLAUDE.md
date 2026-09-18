@AGENTS.md

# Calculadora de Custo de Energia — Regras do Projeto

## COMO TRABALHAR COMIGO (leia isso primeiro, sempre)

- Eu estou aprendendo. NÃO escreva o código completo pronto pra mim, mesmo que pareça mais rápido.
- Sempre explique o conceito antes, me diga o que fazer e por quê, e me deixe escrever o código.
- Só escreva código por mim se eu pedir explicitamente ("pode escrever esse trecho").
- Depois que eu escrever algo, revise e aponte erros — não corrija silenciosamente.
- Trabalhe em TASKS pequenas: uma coisa por vez. Depois de cada task, me diga como testar/validar
  antes de seguir pra próxima. Não pule etapa nem faça várias tasks de uma vez.
- Se eu sugerir algo fora do escopo da v1 (ver abaixo), me avise e sugira guardar pra V2 em vez
  de simplesmente implementar.

## CONTEXTO DO PROJETO

Calculadora de custo de energia por aparelho ("quanto custa deixar isso ligado"), com foco
internacional (inglês primeiro — RPM de anúncio mais alto — depois português). Site 100%
estático, sem backend, sem banco de dados, hospedado grátis (Vercel ou Cloudflare Pages).
Objetivo: aprender construindo, gerar tráfego orgânico via SEO, monetizar com Google AdSense,
e usar como peça de portfólio.

## STACK (travada, não trocar no meio)

- Next.js, App Router, `output: 'export'` (site estático)
- TypeScript
- Tailwind CSS + shadcn/ui
- lucide-react (ícones)
- Zod (validação de formulário)
- Jest (teste só da função de cálculo)
- Sem backend, sem banco de dados, sem autenticação, sem CMS

## ESCOPO DA V1 (só isso, nada além)

- Calculadora única: potência (watts) + horas de uso por dia + tarifa de energia → custo diário,
  mensal e anual
- Tarifa padrão preenchida por país (dropdown com ~10-15 países) + campo editável
- Validação do formulário com Zod (sem número negativo, sem campo vazio)
- Páginas por aparelho reusando o mesmo componente: PC, geladeira, ar-condicionado, PS5/Xbox,
  aquecedor, chuveiro
- Versão em inglês (prioridade) e português, mesma estrutura de rota (`/en/pc`, `/pt/pc`)
- Texto de apoio (300-500 palavras) + FAQ curto em cada página, pra SEO

## FORA DO ESCOPO (fica pra V2, não implementar agora)

- Mapa-múndi interativo / múltiplas APIs de tarifa em tempo real
- Login, histórico de cálculos, conta de usuário
- Comparação lado a lado de vários aparelhos na mesma tela
- Mais idiomas além de inglês/português
- Outras calculadoras no mesmo domínio

## DADOS DE REFERÊNCIA (usar nos arquivos de dados, task 3)

Tarifas de energia padrão por país (kWh):
- EUA: US$0,16
- Reino Unido: £0,28
- Brasil: R$0,75
- Canadá: CAD$0,13
- Portugal: €0,24
- Alemanha: €0,40
- Austrália: AUD$0,30
- México: MXN$2,50

Potência típica por aparelho (watts):
- PC gamer (em uso): 350W
- PC escritório (em uso): 100W
- Geladeira (média, ciclo liga/desliga): 50W efetivo
- Ar-condicionado (split 9000-12000 BTU): 1000W
- PS5 / Xbox Series X (jogando): 200W
- Aquecedor elétrico: 1500W
- Chuveiro elétrico: 5500W

Observação: valores estimados — conferir fonte antes do lançamento, não são de referência
oficial verificada.

## TASKS DA V1, EM ORDEM (uma por vez, testar antes de avançar)

1. **Configurar export estático** — ajustar `next.config.js` pra `output: 'export'`. Validar:
   rodar `npm run build` e conferir que gera a pasta `out/` sem erro.
2. **Instalar shadcn/ui e Zod** — configurar shadcn (`npx shadcn@latest init`) e instalar Zod.
   Validar: os pacotes aparecem no `package.json`, projeto ainda roda com `npm run dev`.
3. **Criar os arquivos de dados** — `lib/data/tarifas.ts` e `lib/data/aparelhos.ts` com os
   valores da seção acima. Validar: os arquivos exportam os dados sem erro de tipo.
4. **Criar a função pura de cálculo** — função separada (ex: `lib/calculo.ts`) que recebe
   potência, horas/dia e tarifa, devolve custo diário/mensal/anual. Sem UI ainda, só a lógica.
   Validar: escrever teste Jest cobrindo casos normais e valores zero/negativo, `npm test` passa.
5. **Criar o formulário da calculadora** — inputs de potência, horas, tarifa, com schema Zod
   validando. Validar: digitar valor inválido mostra erro, valor válido não trava.
6. **Conectar formulário à função de cálculo** — ao submeter, mostra resultado (diário/mensal/
   anual). Validar: testar manualmente com um caso conhecido (ex: PC de 300W, 8h/dia, tarifa
   R$0,75 — conferir a conta na mão).
7. **Estilizar com Tailwind/shadcn** — deixar visual limpo e responsivo. Validar: testar em
   celular real e em tela larga.
8. **Criar a primeira página de aparelho completa** (ex: PC) — calculadora + texto de apoio +
   FAQ, reusando o componente da task 6. Validar: página carrega, calcula certo, passa no
   Lighthouse (meta: 90+).
9. **Replicar pros outros aparelhos** — geladeira, ar-condicionado, PS5/Xbox, aquecedor,
   chuveiro, cada um com potência sugerida diferente. Validar: cada página calcula certo com
   seus próprios valores padrão.
10. **Criar as rotas em português** — espelhar `/en/*` em `/pt/*`. Validar: as duas versões
    calculam igual, só o texto muda.
11. **Deploy inicial** — subir no Vercel ou Cloudflare Pages. Validar: site abre no link público,
    funciona igual ao local.

Depois da task 11, a v1 está pronta — aí entra a fase de observar tráfego antes de considerar
qualquer coisa da lista "fora do escopo".