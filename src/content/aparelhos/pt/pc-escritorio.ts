import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "Quanto custa deixar um PC de escritório ligado?",
  textoApoio: [
    "Um computador de escritório, sem placa de vídeo dedicada, gasta pouco. Usando navegador, planilhas e e-mail, um PC de mesa assim costuma ficar entre 50 e 100 W. Um notebook gasta ainda menos, muitas vezes entre 20 e 60 W. A calculadora começa com 100 W e 8 horas por dia, que é um dia de trabalho com um PC de mesa simples.",
    "Um exemplo: 100 W durante 8 horas por dia, com a energia a R$ 1,05 o kWh, custa cerca de **R$ 0,84 por dia**, **R$ 25,55 por mês** e **R$ 306,60 por ano**. São uns 24,3 kWh por mês.",
    "**Quem trabalha em casa** sente essa conta todo mês. Não é um valor alto sozinho, mas junto com monitor, roteador, luz e ar-condicionado vai somando.",
    "**O monitor fica de fora.** Some mais uns 20 a 40 W por monitor. Quem usa dois monitores pode quase dobrar o gasto do computador.",
    "**Como descobrir o consumo do seu.** Um medidor de tomada (wattímetro) mostra o valor real. A etiqueta atrás do gabinete ou o carregador do notebook mostram o máximo, não o uso normal.",
  ],
  tituloTexto: "Quanto um PC de escritório gasta",
  tituloDicas: "Como gastar menos com o computador",
  dicas: [
    {
      titulo: "Tela e suspensão automáticas",
      texto:
        "Configure a tela para apagar e o PC para dormir depois de alguns minutos parado.",
      icone: "clock",
    },
    {
      titulo: "Desligue no fim do dia",
      texto: "Em vez de deixar ligado até o dia seguinte.",
      icone: "power",
    },
    {
      titulo: "Notebook gasta menos",
      texto:
        "Se for trocar de máquina, um notebook costuma gastar menos que um PC de mesa.",
      icone: "gauge",
    },
  ],
  faq: [
    {
      pergunta: "Vale a pena desligar o computador à noite?",
      resposta: "Sim, se você não precisa dele ligado. São horas de consumo que não servem para nada. Ligar e desligar todo dia não estraga o computador.",
    },
    {
      pergunta: "Proteção de tela economiza energia?",
      resposta: "Quase nada. O que economiza é desligar a tela ou colocar o computador em suspensão.",
    },
    {
      pergunta: "Deixar o notebook sempre na tomada gasta mais?",
      resposta: "Com a bateria cheia, o carregador puxa pouco além do que o notebook está usando. A diferença na conta é pequena.",
    },
  ],
};

export default conteudo;
