import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "How much does it cost to leave an office PC on?",
  textoApoio: [
    "An office computer without a dedicated graphics card uses little power. Running a browser, spreadsheets and email, a desktop like this usually draws between 50 and 100 W. A laptop uses even less, often between 20 and 60 W. The calculator starts at 100 W and 8 hours a day: a workday on a basic desktop.",
    "An example: 100 W for 8 hours a day, at $0.18 per kWh, costs about **$0.14 a day**, **$4.38 a month** and **$52.56 a year**. That is around 24.3 kWh a month.",
    "**If you work from home**, you pay this every month. It isn't much on its own, but together with the monitor, router, lights and air conditioning it adds up.",
    "**The monitor is not included.** Add roughly 20 to 40 W per monitor. With two monitors, you can almost double what the computer uses.",
    "**How to find your number.** A plug-in power meter shows the real value. The label on the back of the tower or on the laptop charger shows the maximum, not normal use.",
  ],
  tituloTexto: "How much an office PC uses",
  tituloDicas: "How to spend less on your computer",
  dicas: [
    {
      titulo: "Auto screen-off and sleep",
      texto:
        "Set the screen to turn off and the PC to sleep after a few idle minutes.",
      icone: "clock",
    },
    {
      titulo: "Shut down at the end of the day",
      texto: "Instead of leaving it on until the next morning.",
      icone: "power",
    },
    {
      titulo: "Laptops use less",
      texto:
        "If you're replacing it, a laptop usually uses less than a desktop.",
      icone: "gauge",
    },
  ],
  faq: [
    {
      pergunta: "Is it worth turning my computer off at night?",
      resposta: "Yes, if you don't need it on. Those are hours of power that do nothing for you. Turning it on and off every day won't damage the computer.",
    },
    {
      pergunta: "Does a screensaver save power?",
      resposta: "Barely. What saves power is turning the screen off or putting the computer to sleep.",
    },
    {
      pergunta: "Does keeping my laptop plugged in all the time cost more?",
      resposta: "With a full battery, the charger draws little beyond what the laptop is using. The difference on your bill is small.",
    },
  ],
};

export default conteudo;
