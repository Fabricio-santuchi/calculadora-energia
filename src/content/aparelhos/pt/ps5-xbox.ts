import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "Quanto custa deixar um PS5 ou Xbox ligado?",
  textoApoio: [
    "Os consoles atuais gastam menos que um PC gamer, mas ainda puxam bastante energia quando você está jogando. Um PS5 ou um Xbox Series X costuma ficar entre 150 e 220 W num jogo pesado. O Xbox Series S gasta menos, muitas vezes abaixo de 100 W. Nos menus ou vendo filme, o consumo cai. A calculadora começa com 200 W e 3 horas por dia.",
    "Um exemplo: 200 W durante 3 horas por dia, com a energia a R$ 1,05 o kWh, custa cerca de **R$ 0,63 por dia**, **R$ 19,16 por mês** e **R$ 229,95 por ano**. São uns 18,3 kWh por mês.",
    "**A TV fica de fora.** Esta conta é só do console. Uma TV grande pode gastar tanto quanto ele, então some a potência da TV se quiser o total da sessão de jogo.",
    "**E o modo de repouso?** Os consoles têm um modo de descanso que mantém downloads e atualizações funcionando. Ele gasta pouco por hora, mas fica ligado o dia inteiro. Se você não precisa baixar nada, deixar o console desligado de verdade é o que gasta menos. O modo \"ligar instantâneo\" do Xbox, por exemplo, gasta mais que o modo de economia de energia.",
    "**Como descobrir o consumo do seu.** Um medidor de tomada (wattímetro) mostra o valor real enquanto você joga. A etiqueta atrás do console mostra o máximo da fonte, não o uso normal.",
  ],
  tituloTexto: "Quanto um PS5 ou Xbox gasta",
  tituloDicas: "Como gastar menos com o console",
  dicas: [
    {
      titulo: "Desligue de verdade",
      texto:
        "Se não precisa baixar nada, desligar gasta menos que o modo de repouso.",
      icone: "power",
    },
    {
      titulo: "Modo de economia",
      texto:
        'No Xbox, prefira o modo de economia de energia ao "ligar instantâneo".',
      icone: "gauge",
    },
    {
      titulo: "Lembre da TV",
      texto:
        "A TV pode gastar tanto quanto o console. Desligue quando parar de jogar.",
      icone: "tv",
    },
  ],
  faq: [
    {
      pergunta: "PS5 gasta mais que Xbox?",
      resposta: "PS5 e Xbox Series X gastam parecido jogando. O Xbox Series S gasta bem menos.",
    },
    {
      pergunta: "Deixar o console em repouso gasta muito?",
      resposta: "Pouco por hora, mas soma no mês porque fica o dia todo. Se quiser economizar, desligue totalmente ou use o modo de economia de energia.",
    },
    {
      pergunta: "Jogar no console gasta menos que no PC?",
      resposta: "Na maioria dos casos, sim. Um PC gamer costuma gastar mais que um console jogando o mesmo jogo.",
    },
  ],
};

export default conteudo;
