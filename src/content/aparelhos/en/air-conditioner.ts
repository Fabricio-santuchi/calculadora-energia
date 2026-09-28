import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "How much does it cost to leave the air conditioner on?",
  textoApoio: [
    "For people who use it every day, air conditioning is often the biggest item on the power bill. A 9,000 BTU unit, a common size for a bedroom, usually draws around 700 to 1,000 W when the compressor is at full power. Bigger units use more. The calculator starts at 1,000 W and 8 hours: a night of sleep with the AC on.",
    "An example: 1,000 W for 8 hours a day, at $0.18 per kWh, costs about **$1.44 a day**, **$43.80 a month** and **$525.60 a year**. That is around 243.3 kWh a month.",
    "**This is the worst case.** Once the room has cooled down, the unit works less. An **inverter** model slows its compressor down instead of switching on and off, so it usually uses much less than its maximum for most of the night. If yours is an inverter, the real cost will likely be lower than the calculator's result.",
    "**How to find your number.** The wattage is in the manual or on the label of the indoor unit. An energy label may show yearly consumption, but it is based on a standard usage pattern that may not match yours.",
    "**To spend less:** set the temperature to around 24–26 °C (75–78 °F) instead of very cold; keep doors and windows closed; clean the filter often; block the afternoon sun with curtains; and use the timer to switch off in the early morning.",
  ],
  faq: [
    {
      pergunta: "Does an inverter AC really save power?",
      resposta: "In most cases, yes, especially when it runs for many hours in a row. The savings depend on the model and how you use it.",
    },
    {
      pergunta: "What temperature uses the least power?",
      resposta: "The closer it is to the temperature outside, the less the unit works. Around 24–26 °C (75–78 °F) is usually comfortable and costs less than a very low setting.",
    },
    {
      pergunta: "Does turning it on and off a lot use more?",
      resposta: "For short breaks, it is better to leave it on at a higher temperature. If you'll be out for hours, turn it off.",
    },
  ],
};

export default conteudo;
