import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "How much does it cost to run a fridge?",
  textoApoio: [
    "The fridge is the only appliance in the house that runs 24 hours a day, every day. Even so, it doesn't use its rated power all the time: the compressor turns on, cools, turns off and stays off for a while. That is why the calculator uses **50 W**, an average over the whole day, not the maximum.",
    "An example: a 50 W average for 24 hours, at $0.18 per kWh, costs about **$0.22 a day**, **$6.57 a month** and **$78.84 a year**. That is around 36.5 kWh a month.",
    "**How to find your fridge's number.** The energy label (EnergyGuide in the US, the energy label in the UK and Europe) shows consumption in **kWh per year**. That is the most useful number. To turn it into average watts, divide it by 8.76. For example: 438 kWh a year ÷ 8.76 = 50 W. Put that result into the calculator with 24 hours.",
    "**Don't use the rated power.** If the sticker on the back says 150 W, that is what the compressor draws while it is running. Using 150 W for 24 hours would give you about three times the real cost.",
    "**What makes a fridge use more:** an old fridge or worn door seals; opening the door often or for a long time; putting hot food inside; placing it against the wall or next to the stove; and very hot days.",
  ],
  faq: [
    {
      pergunta: "Why 50 W if my fridge says 150 W?",
      resposta: "Because the compressor isn't running all the time. The 50 W is the average for the day, including the hours when it is off.",
    },
    {
      pergunta: "Do old fridges use more power?",
      resposta: "Usually, yes. Newer models tend to be more efficient, and worn seals let the cold escape. Compare the kWh per year on your label with a new model's.",
    },
    {
      pergunta: "Does turning the fridge off at night save money?",
      resposta: "It isn't worth it. It will spend power cooling everything down again, and food can spoil.",
    },
  ],
};

export default conteudo;
