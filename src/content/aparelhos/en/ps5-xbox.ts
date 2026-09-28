import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "How much does it cost to leave a PS5 or Xbox on?",
  textoApoio: [
    "Current consoles use less power than a gaming PC, but they still draw quite a bit while you play. A PS5 or Xbox Series X usually runs between 150 and 220 W in a demanding game. The Xbox Series S uses less, often under 100 W. In menus or while streaming video, the draw goes down. The calculator starts at 200 W and 3 hours a day.",
    "An example: 200 W for 3 hours a day, at $0.18 per kWh, costs about **$0.11 a day**, **$3.29 a month** and **$39.42 a year**. That is around 18.3 kWh a month.",
    "**The TV is not included.** This is just the console. A large TV can use as much as the console does, so add the TV's wattage if you want the total for a gaming session.",
    "**What about rest mode?** Consoles have a rest or standby mode that keeps downloads and updates running. It uses little per hour, but it stays on all day. If you don't need to download anything, turning the console fully off uses the least. Xbox's \"instant-on\" mode, for example, uses more than its energy-saving mode.",
    "**How to find your number.** A plug-in power meter shows the real value while you play. The label on the back of the console shows the power supply's maximum, not normal use.",
  ],
  faq: [
    {
      pergunta: "Does a PS5 use more power than an Xbox?",
      resposta: "The PS5 and Xbox Series X use about the same while gaming. The Xbox Series S uses much less.",
    },
    {
      pergunta: "Does leaving the console in rest mode cost a lot?",
      resposta: "Little per hour, but it adds up over the month because it's on all day. To save, turn it fully off or use the energy-saving mode.",
    },
    {
      pergunta: "Is gaming on a console cheaper than on a PC?",
      resposta: "In most cases, yes. A gaming PC usually uses more than a console playing the same game.",
    },
  ],
};

export default conteudo;
