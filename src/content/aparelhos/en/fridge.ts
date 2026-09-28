import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "How much does it cost to run a fridge?",
  textoApoio: [
    "The fridge is the only appliance in the house that runs 24 hours a day, every day. Even so, it doesn't use its rated power all the time: the compressor turns on, cools, turns off and stays off for a while. That is why the calculator uses **50 W**, an average over the whole day, not the maximum.",
    "An example: a 50 W average for 24 hours, at $0.18 per kWh, costs about **$0.22 a day**, **$6.57 a month** and **$78.84 a year**. That is around 36.5 kWh a month.",
    "**How to find your fridge's number.** The energy label (EnergyGuide in the US, the energy label in the UK and Europe) shows consumption in **kWh per year**. That is the most useful number. To turn it into average watts, divide it by 8.76. For example: 438 kWh a year ÷ 8.76 = 50 W. Put that result into the calculator with 24 hours.",
    "**Don't use the rated power.** If the sticker on the back says 150 W, that is what the compressor draws while it is running. Using 150 W for 24 hours would give you about three times the real cost.",
  ],
  tituloTexto: "How much a fridge uses",
  tituloDicas: "How to spend less on your fridge",
  dicas: [
    {
      titulo: "Keep it away from heat",
      texto: "Don't push it against the wall or next to the stove.",
      icone: "thermometer",
    },
    {
      titulo: "Keep the door shut",
      texto:
        "Open it less often and briefly, and check that the seal is tight.",
      icone: "door",
    },
    {
      titulo: "Nothing hot inside",
      texto: "Let food cool down before putting it away.",
      icone: "clock",
    },
  ],
  rotuloPotencia: "Average power",
  explicacao: {
    titulo: "Why 50 W and not the label value?",
    texto:
      "A fridge's compressor turns on and off all day. The label shows the power only while it runs. Here we use the 24-hour average, which is what shows up on your bill. Using the label value makes the result much higher than it really is.",
  },
  notaTempo: "A fridge runs all the time, so it starts at 24 h.",
  avisoResultado:
    "Estimated values. The real cost depends on the model, the fridge's age and your rate.",
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
