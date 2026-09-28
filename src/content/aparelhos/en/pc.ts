import type { ConteudoAparelho } from "../tipos";

const conteudo: ConteudoAparelho = {
  tituloPagina: "How much does it cost to leave a gaming PC on?",
  textoApoio: [
    "A gaming PC uses a lot more power than a regular computer, but how much depends on what you are doing. Sitting on the desktop, a PC with a dedicated graphics card usually draws somewhere between 60 and 120 W. In a demanding game it can go past 300 or 400 W, depending on the graphics card and the processor. That is why the calculator starts at 350 W: a middle ground for someone who plays a few hours a day on a mid-range build.",
    "An example: 350 W for 4 hours a day, at $0.18 per kWh, costs about **$0.25 a day**, **$7.67 a month** and **$91.98 a year**. That is around 42.6 kWh a month on your bill.",
    "**Don't use the power supply rating.** A 650 W or 750 W power supply tells you the most it can deliver, not what your PC uses. A PC with a 750 W supply almost never uses all of it. If you put the supply rating into the calculator, the result will come out well above reality.",
    "**How to find your PC's real number.** The most reliable way is a plug-in power meter: plug the PC into it and it shows the draw in real time. Software that reports graphics card power helps, but it leaves out the rest of the computer. Measure while gaming and while idle, because the difference is big.",
    "**The monitor is not included.** This is just the tower. To include the monitor, add roughly 20 to 60 W, depending on its size and brightness.",
  ],
  tituloTexto: "How much a gaming PC uses",
  tituloDicas: "How to spend less on your PC",
  dicas: [
    {
      titulo: "Cap your frame rate",
      texto:
        "Locking the game to what your monitor can show keeps the graphics card from working for nothing.",
      icone: "gauge",
    },
    {
      titulo: "Use sleep mode",
      texto:
        "When you step away, let it sleep. In sleep mode it uses almost nothing.",
      icone: "clock",
    },
    {
      titulo: "Shut down at night",
      texto:
        "If nothing needs to download, shutting down at night cuts hours of use that do nothing for you.",
      icone: "power",
    },
  ],
  faq: [
    {
      pergunta: "Does leaving my PC on overnight cost a lot?",
      resposta: "Idling on the desktop at around 100 W for 8 hours comes to about $0.14 a night, or around $4.40 a month. In sleep mode it drops to almost nothing.",
    },
    {
      pergunta: "Does a 750 W power supply use 750 W?",
      resposta: "No. That is the supply's limit. The PC only draws what it needs at that moment, which is usually much less.",
    },
    {
      pergunta: "Is the monitor included?",
      resposta: "No. Add your monitor's wattage to the PC's if you want the total.",
    },
    {
      pergunta: "Does gaming on a laptop use less power?",
      resposta: "Most of the time, yes. Gaming laptops usually use less than a desktop with similar parts, but they also tend to be less powerful.",
    },
  ],
};

export default conteudo;
