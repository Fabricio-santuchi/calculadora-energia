import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "Quanto custa deixar uma geladeira ligada?",
  textoApoio: [
    "A geladeira é o único aparelho da casa que fica ligado 24 horas por dia, todos os dias. Mesmo assim, ela não gasta a potência da etiqueta o tempo todo: o motor (compressor) liga, esfria, desliga e fica parado por um tempo. Por isso a calculadora usa **50 W**, que é uma média do dia inteiro, e não a potência máxima.",
    "Um exemplo: 50 W de média durante 24 horas, com a energia a R$ 1,05 o kWh, custa cerca de **R$ 1,26 por dia**, **R$ 38,33 por mês** e **R$ 459,90 por ano**. São uns 36,5 kWh por mês.",
    "**Como achar o número da sua geladeira.** No Brasil, a etiqueta amarela de eficiência (do Inmetro/Procel) mostra o consumo em **kWh por mês**. Esse é o número mais útil. Para transformar em watts de média, multiplique por 1000 e divida por 730. Por exemplo: 36,5 kWh/mês × 1000 ÷ 730 = 50 W. Coloque esse resultado na calculadora com 24 horas.",
    "**Não use a potência da placa.** Se a etiqueta de trás diz 150 W, isso é o que o motor puxa quando está ligado. Colocar 150 W com 24 horas daria três vezes mais que o real.",
  ],
  tituloTexto: "Quanto uma geladeira gasta",
  tituloDicas: "Como gastar menos com a geladeira",
  dicas: [
    {
      titulo: "Longe do calor",
      texto: "Não deixe colada na parede nem perto do fogão.",
      icone: "thermometer",
    },
    {
      titulo: "Porta fechada",
      texto:
        "Abra menos vezes e por pouco tempo, e confira se a borracha veda bem.",
      icone: "door",
    },
    {
      titulo: "Nada quente lá dentro",
      texto: "Espere a comida esfriar antes de guardar.",
      icone: "clock",
    },
  ],
  rotuloPotencia: "Potência média",
  explicacao: {
    titulo: "Por que 50 W e não o valor da etiqueta?",
    texto:
      "O motor da geladeira liga e desliga o dia todo. A etiqueta mostra a potência só com o motor ligado. Aqui usamos a média de 24 horas, que é o que chega na conta. Colocar o valor da etiqueta deixa o resultado bem maior que o real.",
  },
  notaTempo: "Geladeira fica ligada o tempo todo, então já vem 24 h.",
  avisoResultado:
    "Valores estimados. O custo real depende do modelo, da idade da geladeira e da sua tarifa.",
  faq: [
    {
      pergunta: "Por que 50 W, se a minha geladeira diz 150 W?",
      resposta: "Porque o motor não fica ligado o tempo todo. Os 50 W são a média do dia, contando as horas em que ele está parado.",
    },
    {
      pergunta: "Geladeira velha gasta mais?",
      resposta: "Em geral, sim. Modelos novos costumam ser mais eficientes, e borrachas gastas deixam o frio escapar. Compare o kWh/mês da etiqueta da sua com a de um modelo novo.",
    },
    {
      pergunta: "Desligar a geladeira à noite economiza?",
      resposta: "Não vale a pena. Ela vai gastar para esfriar tudo de novo, e a comida pode estragar.",
    },
  ],
};

export default conteudo;
