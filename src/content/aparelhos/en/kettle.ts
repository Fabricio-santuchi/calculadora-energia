import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "How much does it cost to use an electric kettle?",
  textoApoio: [
    "An electric kettle has high power, around 1,500 W in North America and up to 3,000 W in the UK and Europe, but it only runs for a few minutes. That is why it costs little by the end of the month. On this page, time is in **minutes per day**, and the calculator starts at 2,000 W and 5 minutes, roughly the time to boil a full kettle.",
    "An example: 2,000 W for 5 minutes a day, at $0.18 per kWh, costs about **$0.03 per use**, **$0.91 a month** and **$10.95 a year**. That is around 5.1 kWh a month. If you boil water three times a day, enter 15 minutes.",
    "**What changes the time:** the amount of water matters most. Boiling a full kettle for one cup uses several times more than you need. The temperature of the tap water also counts: in winter it takes longer.",
    "**How to find your kettle's power.** It's printed on the base of the kettle or on the box. For the time, check how long it takes to switch off on its own.",
    "**To spend less:** boil only the water you'll use; descale it now and then, because limescale slows heating; and don't reboil water that has just boiled.",
  ],
  faq: [
    {
      pergunta: "Does an electric kettle use a lot of electricity?",
      resposta: "The power is high, but the time is short. With normal use, it comes to a small amount each month.",
    },
    {
      pergunta: "Is it cheaper to boil water in a kettle or on the stove?",
      resposta: "It depends on gas and electricity prices where you live. An electric kettle usually loses less heat than a pan on the stove, but electricity can cost more per unit of energy than gas.",
    },
    {
      pergunta: "Does leaving the kettle plugged in use power?",
      resposta: "Most simple models use nothing when switched off. Models with a display or a keep-warm function may use a little.",
    },
  ],
};

export default conteudo;
