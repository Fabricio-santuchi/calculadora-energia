import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "Quanto custa deixar um aquecedor elétrico ligado?",
  textoApoio: [
    "Aquecedor elétrico é um dos aparelhos que mais gastam energia por hora. A maioria dos modelos de uso doméstico, seja a óleo, cerâmico ou de ventilador, fica entre 1.000 e 2.000 W na potência máxima. A calculadora começa com 1.500 W e 6 horas por dia, que é um uso comum em noites frias.",
    "Um exemplo: 1.500 W durante 6 horas por dia, com a energia a R$ 1,05 o kWh, custa cerca de **R$ 9,45 por dia**, **R$ 287,44 por mês** e **R$ 3.449,25 por ano**. São uns 273,8 kWh por mês. Na prática, pouca gente usa o ano inteiro: olhe o valor por dia e multiplique pelos dias de frio.",
    "**O termostato muda a conta.** Se o seu aquecedor tem termostato, ele desliga sozinho quando o cômodo chega na temperatura escolhida e liga de novo quando esfria. Assim, ele não gasta a potência máxima o tempo todo, e o custo real tende a ficar abaixo do resultado da calculadora.",
    "**Óleo, cerâmico ou ventilador: qual gasta menos?** Com a mesma potência, todos transformam praticamente toda a energia em calor. A diferença está em como o calor se espalha: o de óleo esquenta devagar e segura o calor por mais tempo; o de ventilador esquenta rápido perto de você. O que mais pesa na conta é a potência e o tempo ligado.",
    "**Para gastar menos:** aqueça só o cômodo onde você está, com a porta fechada; use a potência mais baixa quando der; use o timer para não deixar ligado a noite toda; e vede frestas de portas e janelas.",
  ],
  faq: [
    {
      pergunta: "Aquecedor a óleo economiza?",
      resposta: "Não gasta menos por hora que outro da mesma potência. A vantagem é que ele continua soltando calor depois que o termostato desliga.",
    },
    {
      pergunta: "Posso deixar ligado a noite toda?",
      resposta: "Dá para calcular aqui, mas é a forma mais cara de usar. Um timer para desligar depois que você dormir costuma economizar bastante.",
    },
    {
      pergunta: "Ar-condicionado quente gasta menos que aquecedor?",
      resposta: "Em geral, sim. Um ar-condicionado com função quente costuma gerar mais calor para cada kWh gasto do que um aquecedor comum.",
    },
  ],
};

export default conteudo;
