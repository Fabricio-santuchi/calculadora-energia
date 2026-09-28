import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "How much does it cost to run a space heater?",
  textoApoio: [
    "An electric space heater is one of the most power-hungry appliances per hour. Most home models, whether oil-filled, ceramic or fan heaters, run between 1,000 and 2,000 W on their highest setting, and 1,500 W is very common. The calculator starts at 1,500 W and 6 hours a day, a typical use on cold evenings.",
    "An example: 1,500 W for 6 hours a day, at $0.18 per kWh, costs about **$1.62 a day**, **$49.28 a month** and **$591.30 a year**. That is around 273.8 kWh a month. In practice, few people use one all year: look at the daily cost and multiply it by your cold days.",
    "**The thermostat changes the math.** If your heater has a thermostat, it turns itself off when the room reaches the chosen temperature and back on when it cools down. So it doesn't draw full power the whole time, and the real cost will likely be lower than the calculator's result.",
    "**Oil-filled, ceramic or fan: which uses less?** At the same wattage, they all turn practically all their power into heat. The difference is how the heat spreads: an oil-filled heater warms up slowly and holds heat longer; a fan heater warms the area near you quickly. What matters most for your bill is the wattage and how long it runs.",
    "**To spend less:** heat only the room you're in, with the door closed; use the lower setting when you can; use a timer so it doesn't run all night; and seal gaps around doors and windows.",
  ],
  faq: [
    {
      pergunta: "Do oil-filled heaters save money?",
      resposta: "They don't use less per hour than another heater of the same wattage. The advantage is that they keep giving off heat after the thermostat switches off.",
    },
    {
      pergunta: "Can I leave it on all night?",
      resposta: "You can calculate it here, but it's the most expensive way to use one. A timer that switches it off after you fall asleep usually saves a lot.",
    },
    {
      pergunta: "Does a heat pump or reverse-cycle AC cost less than a heater?",
      resposta: "Usually, yes. A heat pump typically produces more heat for each kWh than a regular electric heater.",
    },
  ],
};

export default conteudo;
