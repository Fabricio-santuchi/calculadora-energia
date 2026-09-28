import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "Quanto custa um banho no chuveiro elétrico?",
  textoApoio: [
    "O chuveiro elétrico é um dos aparelhos que mais gastam energia na casa brasileira. Os modelos comuns ficam entre 4.500 e 7.500 W na posição inverno. Nesta página o tempo é em **minutos por dia**, e a calculadora começa com 5.500 W e um banho de 10 minutos.",
    "Um exemplo: 5.500 W durante 10 minutos por dia, com a energia a R$ 1,05 o kWh, custa cerca de **R$ 0,96 por banho**, **R$ 29,28 por mês** e **R$ 351,31 por ano**. São uns 27,9 kWh por mês. Isso é para **uma pessoa**. Numa casa com quatro pessoas tomando um banho de 10 minutos por dia, coloque 40 minutos: o mês passa de R$ 117.",
    "**Inverno ou verão?** A potência escrita no chuveiro é a da posição inverno, a mais quente. Na posição verão, ele usa uma potência menor, e o banho sai mais barato. Se você usa sempre no verão, a conta real fica abaixo do resultado da calculadora.",
    "**Como descobrir a potência do seu.** Ela vem na embalagem, no manual ou gravada no próprio chuveiro, algo como \"5500 W\" ou \"7500 W\". Se tiver duas, a maior é a do inverno.",
  ],
  tituloTexto: "Quanto um chuveiro elétrico gasta",
  tituloDicas: "Como gastar menos no banho",
  dicas: [
    {
      titulo: "Banho mais curto",
      texto: "O tempo é o que mais pesa: cada minuto a menos conta.",
      icone: "clock",
    },
    {
      titulo: "Posição verão",
      texto: "Nos dias quentes, use a posição verão, que gasta menos.",
      icone: "thermometer",
    },
    {
      titulo: "Desligue ao se ensaboar",
      texto:
        "Fechar o chuveiro enquanto se ensaboa corta minutos de consumo.",
      icone: "droplet",
    },
  ],
  rotuloPotencia: "Potência do chuveiro",
  notaPotencia:
    "A potência muda com a chave de temperatura. Veja na etiqueta do chuveiro.",
  notaTempo: "Um banho por pessoa. Para a casa toda, some os minutos de todo mundo.",
  faq: [
    {
      pergunta: "Quanto custa um banho de 15 minutos?",
      resposta: "Com 5.500 W e R$ 1,05 o kWh, cerca de R$ 1,44 por banho. Mude o tempo na calculadora para ver o seu caso.",
    },
    {
      pergunta: "A posição verão economiza mesmo?",
      resposta: "Sim. Ela usa menos potência, então cada minuto de banho custa menos.",
    },
    {
      pergunta: "Chuveiro elétrico gasta mais que gás?",
      resposta: "Depende do preço do gás e da energia na sua cidade. Esta calculadora mostra só o lado da energia elétrica.",
    },
  ],
};

export default conteudo;
