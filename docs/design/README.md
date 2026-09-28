# Referência visual do site

Estas são as telas do design, exportadas do canvas "Calculadora de Energia — Visual" na versão
**definitiva de 28/09/2026**.

**A regra está em [`ESPEC-TELAS.md`](ESPEC-TELAS.md)**. Ele traz medidas, cores, textos pt/en,
dados novos e comportamento em cada tamanho de tela. Os `.dc.html` são a imagem de referência.
Se os dois discordarem, vale o `ESPEC-TELAS.md`.

**Como usar os `.dc.html`:** só como referência de layout, cores, fontes, espaçamentos e textos.
NÃO copiar a estrutura (`<x-dc>`, `<sc-for>`, `<dc-import>`, `{{...}}`, `class Component extends DCLogic`):
isso é o formato da ferramenta de design, não é React/Next. No projeto, tudo vira componentes
React com classes do Tailwind.

| Arquivo | O que é | Rota no site |
|---|---|---|
| Guia.dc.html | Guia de estilo: cores, fontes, medidas, componentes | — |
| Header.dc.html | Cabeçalho (componente `<Header>`) | todas |
| Footer.dc.html | Rodapé (componente `<Footer>`) | todas |
| Idioma.dc.html | Escolha de idioma | `/` |
| Inicio.dc.html | Início, computador (1440) | `/pt`, `/en` |
| Main.dc.html | Página de aparelho, modelo definitivo (PC gamer), computador | `/pt/pc`, `/en/pc` e todas as de aparelho |
| CalcChuveiro.dc.html | Variação: aparelho com tempo em minutos | `/pt/chuveiro` (e chaleira) |
| CalcGeladeira.dc.html | Variação: geladeira com a explicação dos 50 W | `/pt/geladeira`, `/en/fridge` |
| Sobre.dc.html | Sobre | `/pt/sobre` (task 19) |
| Contato.dc.html | Contato | `/pt/contato` (task 19) |
| Privacidade.dc.html | Política de Privacidade | `/pt/privacidade` (task 19) |
| NotFound.dc.html | Página 404 | `app/global-not-found.tsx` |
| TabletInicio.dc.html / Tablet.dc.html | Início e página de aparelho no tablet (768 px) | faixa `md:` |
| Tela600Inicio.dc.html / Tela600.dc.html | Início e página de aparelho na tela de 600 px | faixa `xs:` (480–767) |
| MobileInicio.dc.html / Mobile.dc.html | Início e página de aparelho no celular (390 px) | padrão |
| MobileMenu, MobileSobre, MobileContato, MobilePrivacidade, MobileNotFound | As outras páginas no celular | — |
| Pendencias.dc.html | Lista antiga do que faltava definir (não é página do site) | — |
