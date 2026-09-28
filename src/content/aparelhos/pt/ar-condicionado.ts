import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "Quanto custa deixar o ar-condicionado ligado?",
  textoApoio: [
    "O ar-condicionado costuma ser o aparelho que mais pesa na conta de quem usa todo dia. Um split de 9.000 BTUs, o tamanho mais comum para quarto, costuma gastar perto de 700 a 1.000 W quando o motor está no máximo. Aparelhos maiores gastam mais. A calculadora começa com 1.000 W e 8 horas, que é uma noite de sono com o ar ligado.",
    "Um exemplo: 1.000 W durante 8 horas por dia, com a energia a R$ 1,05 o kWh, custa cerca de **R$ 8,40 por dia**, **R$ 255,50 por mês** e **R$ 3.066,00 por ano**. São uns 243,3 kWh por mês.",
    "**Esse número é o pior caso.** Depois que o quarto esfria, o aparelho trabalha menos. Um modelo **inverter** diminui a força do motor em vez de ficar ligando e desligando, e por isso costuma gastar bem menos que a potência máxima na maior parte da noite. Se o seu é inverter, o custo real tende a ficar abaixo do resultado da calculadora.",
    "**Como descobrir o consumo do seu.** A etiqueta de eficiência mostra o consumo em kWh por mês, mas calculado para um uso padrão, que pode não ser o seu. A potência em watts aparece no manual ou na etiqueta da unidade de dentro.",
    "**Para gastar menos:** deixe a temperatura em 23 °C ou mais, em vez de 18 °C; feche portas e janelas; limpe o filtro com frequência; use cortina para bloquear o sol da tarde; e use o timer para desligar de madrugada.",
  ],
  faq: [
    {
      pergunta: "Ar inverter economiza mesmo?",
      resposta: "Na maioria dos casos, sim, principalmente quando fica ligado muitas horas seguidas. A economia depende do uso e do modelo.",
    },
    {
      pergunta: "Qual temperatura gasta menos?",
      resposta: "Quanto mais perto da temperatura de fora, menos o aparelho trabalha. 23 °C a 25 °C costuma ser confortável e gasta menos que 18 °C.",
    },
    {
      pergunta: "Ligar e desligar várias vezes gasta mais?",
      resposta: "Para pausas curtas, é melhor deixar ligado numa temperatura mais alta. Para ficar horas fora, desligue.",
    },
  ],
};

export default conteudo;
