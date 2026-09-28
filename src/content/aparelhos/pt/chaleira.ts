import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "Quanto custa usar uma chaleira elétrica?",
  textoApoio: [
    "A chaleira elétrica tem potência alta, geralmente entre 1.500 e 2.200 W, mas fica ligada só alguns minutos. Por isso ela gasta pouco no fim do mês. Nesta página o tempo é em **minutos por dia**, e a calculadora começa com 2.000 W e 5 minutos, que é mais ou menos o tempo para ferver uma chaleira cheia.",
    "Um exemplo: 2.000 W durante 5 minutos por dia, com a energia a R$ 1,05 o kWh, custa cerca de **R$ 0,18 por uso**, **R$ 5,32 por mês** e **R$ 63,88 por ano**. São uns 5,1 kWh por mês. Se você ferve água três vezes por dia, coloque 15 minutos.",
    "**O que muda o tempo:** a quantidade de água é o que mais pesa. Ferver a chaleira cheia para fazer uma xícara gasta várias vezes mais do que o necessário. A temperatura da água da torneira também conta: no inverno demora mais.",
    "**Como descobrir a potência da sua.** A potência vem na base da chaleira ou na caixa. Para o tempo, marque no relógio quanto demora para desligar sozinha.",
  ],
  tituloTexto: "Quanto uma chaleira gasta",
  tituloDicas: "Como gastar menos com a chaleira",
  dicas: [
    {
      titulo: "Só a água que vai usar",
      texto: "Ferver a chaleira cheia para uma xícara gasta várias vezes mais.",
      icone: "droplet",
    },
    {
      titulo: "Tire o calcário",
      texto: "O calcário no fundo atrasa o aquecimento.",
      icone: "gauge",
    },
    {
      titulo: "Não ferva de novo",
      texto: "Água que acabou de ferver não precisa ferver outra vez.",
      icone: "power",
    },
  ],
  notaPotencia: "A potência vem na base da chaleira ou na caixa.",
  notaTempo: "Somando todas as vezes que você ferve água no dia.",
  faq: [
    {
      pergunta: "Chaleira elétrica gasta muita energia?",
      resposta: "A potência é alta, mas o tempo é curto. No uso normal, fica em poucos reais por mês.",
    },
    {
      pergunta: "É melhor ferver água na chaleira ou no fogão?",
      resposta: "Depende do preço do gás e da energia onde você mora. A chaleira elétrica costuma perder menos calor que uma panela no fogão, mas o custo por kWh da energia pode ser maior que o do gás.",
    },
    {
      pergunta: "Deixar a chaleira na tomada gasta?",
      resposta: "A maioria dos modelos simples não gasta nada desligada. Modelos com visor ou função de manter quente podem gastar um pouco.",
    },
  ],
};

export default conteudo;
