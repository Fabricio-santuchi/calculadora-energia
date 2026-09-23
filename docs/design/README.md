# Referência visual do site

Estas são as telas do design, exportadas do canvas "Calculadora de Energia — Visual".
São arquivos HTML com os estilos escritos direto em cada elemento (`style="..."`).

**Como usar:** só como referência de layout, cores, fontes, espaçamentos e textos.
NÃO copiar a estrutura (`<x-dc>`, `<sc-for>`, `<dc-import>`, `{{...}}`, `class Component extends DCLogic`):
isso é formato da ferramenta de design, não é React/Next. No projeto, tudo vira componentes
React com classes do Tailwind, seguindo a seção VISUAL do CLAUDE.md.

| Arquivo | O que é | Rota no site |
|---|---|---|
| Guia.dc.html | Guia de estilo: cores, fontes, medidas, componentes | — |
| Header.dc.html | Cabeçalho (componente `<Header>`) | todas |
| Footer.dc.html | Rodapé (componente `<Footer>`) | todas |
| Idioma.dc.html | Escolha de idioma | `/` |
| Inicio.dc.html | Início com calculadora genérica e lista de aparelhos | `/pt`, `/en` |
| Main.dc.html | Página de aparelho, modelo (PC gamer) | `/pt/pc`, `/en/pc` |
| CalcChuveiro.dc.html | Variação: aparelho com tempo em minutos | `/pt/chuveiro` (e chaleira) |
| CalcGeladeira.dc.html | Variação: geladeira com nota dos 50 W | `/pt/geladeira`, `/en/fridge` |
| Sobre.dc.html | Sobre | `/pt/sobre` |
| Contato.dc.html | Contato | `/pt/contato` |
| Privacidade.dc.html | Política de Privacidade | `/pt/privacidade` |
| NotFound.dc.html | Página 404 | `app/not-found.tsx` |
| Mobile*.dc.html | As mesmas páginas no celular (390 px) | — |
| Pendencias.dc.html | Lista do que falta definir (não é página do site) | — |
