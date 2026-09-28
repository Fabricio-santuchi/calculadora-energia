import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "Quanto custa deixar um PC gamer ligado?",
  textoApoio: [
    "Um PC gamer gasta bem mais energia que um computador comum, mas o consumo muda muito conforme o que você está fazendo. Parado na área de trabalho, um PC com placa de vídeo dedicada costuma ficar entre 60 e 120 W. Num jogo pesado, pode passar de 300 ou 400 W, dependendo da placa de vídeo e do processador. Por isso a calculadora começa com 350 W: é um meio-termo para quem joga algumas horas por dia numa máquina intermediária.",
    "Um exemplo: 350 W durante 4 horas por dia, com a energia a R$ 1,05 o kWh, custa cerca de **R$ 1,47 por dia**, **R$ 44,71 por mês** e **R$ 536,55 por ano**. São uns 42,6 kWh por mês na sua conta.",
    "**Cuidado com o número da fonte.** Uma fonte de 650 W ou 750 W mostra o máximo que ela aguenta entregar, não o que o computador gasta. Um PC com fonte de 750 W quase nunca usa tudo isso. Se você colocar o valor da fonte na calculadora, o resultado vai sair bem acima do real.",
    "**Como descobrir o consumo do seu PC.** O jeito mais confiável é um medidor de tomada (wattímetro): você liga o PC nele e ele mostra o consumo na hora. Programas que mostram o consumo da placa de vídeo ajudam, mas não contam o resto do computador. Meça jogando e meça parado, porque a diferença é grande.",
    "**O monitor fica de fora.** Esta conta é só do gabinete. Se quiser incluir o monitor, some mais uns 20 a 60 W, dependendo do tamanho e do brilho.",
  ],
  tituloTexto: "Quanto um PC gamer gasta",
  tituloDicas: "Como gastar menos com o PC",
  dicas: [
    {
      titulo: "Limite o FPS",
      texto:
        "Travar o jogo no que o seu monitor consegue mostrar evita que a placa de vídeo trabalhe à toa.",
      icone: "gauge",
    },
    {
      titulo: "Use a suspensão",
      texto:
        "Quando sair do computador, deixe ele dormir. Em suspensão o gasto cai para quase nada.",
      icone: "clock",
    },
    {
      titulo: "Desligue à noite",
      texto:
        "Se não precisa deixar nada baixando, desligar à noite corta horas de consumo que não servem pra nada.",
      icone: "power",
    },
  ],
  faq: [
    {
      pergunta: "Deixar o PC ligado a noite toda gasta muito?",
      resposta: "Parado na área de trabalho, perto de 100 W por 8 horas, dá uns R$ 0,84 por noite, ou R$ 25 por mês. Em suspensão, o gasto cai para quase nada.",
    },
    {
      pergunta: "Uma fonte de 750 W gasta 750 W?",
      resposta: "Não. Esse é o limite da fonte. O PC só puxa o que precisa naquele momento, e normalmente é bem menos.",
    },
    {
      pergunta: "O monitor entra na conta?",
      resposta: "Não. Some a potência do monitor à do PC se quiser o total.",
    },
    {
      pergunta: "Jogar no notebook gasta menos?",
      resposta: "Na maioria das vezes, sim. Notebooks gamer costumam gastar menos que um PC de mesa com peças parecidas, mas também costumam ter menos desempenho.",
    },
  ],
};

export default conteudo;
