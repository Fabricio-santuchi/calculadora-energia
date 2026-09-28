import type { Metadata } from "next";
import Calculadora from "@/components/calculadora-form";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { aparelhos } from "@/lib/data/aparelhos";

const pcGamer = aparelhos.find((a) => a.slugEn === "pc");
if (!pcGamer) {
  throw new Error("Aparelho 'pc' não encontrado em aparelhos.ts");
}

// Só "en" por enquanto: o texto em português desta página ainda não existe
// (entra na task 13, junto com a réplica pros outros aparelhos).
export function generateStaticParams() {
  return [{ lang: "en" }];
}

export const metadata: Metadata = {
  title:
    "Gaming PC Electricity Cost Calculator | How Much Does It Cost to Run?",
  description:
    "Calculate how much it costs to run your gaming PC per day, month, and year. Enter your PC's wattage, daily usage, and electricity rate to get an instant estimate.",
};

export default function GamingPcPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header idioma="en" ativo="aparelhos" />
      <main className="flex-1">
        <div className="flex justify-center bg-background px-4 py-12">
          <Calculadora idioma="en" aparelho={pcGamer} />
        </div>

        <article className="mx-auto max-w-2xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-foreground">
          How much does it cost to run a gaming PC?
        </h2>
        <div className="mt-4 space-y-4 text-muted-foreground">
          <p>
            A gaming PC is one of the most power-hungry devices in a typical
            household. Unlike a laptop or an office computer, a gaming desktop
            combines a power-draw CPU with a dedicated graphics card, and both
            components ramp up their power consumption significantly under load.
            While idling on the desktop, a gaming PC might draw as little as
            60-100 watts, but during an intense gaming session it can easily
            pull 300-500 watts, and high-end builds with the latest graphics
            cards can spike even higher.
          </p>
          <p>
            The calculator above uses 350 watts as a starting estimate for a
            mid-to-high-end gaming PC actively being used to play games - this
            is a reasonable average for a system with a modern mid-range
            graphics card, but your own PC could draw more or less depending on
            its components. If you know your PC&apos;s actual power draw (from a
            wattmeter, a smart plug, or your power supply&apos;s rated wattage
            under load), enter that value for a more accurate result.
          </p>
          <p>
            To use the calculator, enter your PC&apos;s power draw in watts, how
            many hours per day you actively use it for gaming, and your
            electricity rate per kilowatt-hour. You can pick your country from
            the dropdown to auto-fill a typical rate, and adjust it if you know
            your exact rate from a recent electricity bill. The calculator will
            show you the estimated cost per day, per month, and per year.
          </p>
          <p>
            Keep in mind that these numbers only reflect the PC itself.
            Monitors, speakers, routers, and other peripherals draw additional
            power that isn&apos;t included here. If you want a more complete
            picture of your gaming setup&apos;s running cost, add your
            monitor&apos;s wattage to the PC&apos;s wattage before calculating.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold text-foreground">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-medium text-foreground">
              How many watts does a gaming PC use?
            </h3>
            <p className="mt-1 text-muted-foreground">
              It varies widely depending on the CPU and graphics card, but most
              gaming PCs draw between 200 and 500 watts while actively gaming,
              and 50-100 watts while idle on the desktop.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">
              Does leaving my PC on standby cost money?
            </h3>
            <p className="mt-1 text-muted-foreground">
              Yes, but very little - a PC in sleep mode typically draws only a
              few watts, which adds up to a small fraction of what it costs to
              run the PC under active use.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">
              How can I find my PC&apos;s exact power consumption?
            </h3>
            <p className="mt-1 text-muted-foreground">
              The most accurate way is to plug your PC into a wattmeter or a
              smart plug that reports power usage. Without one, you can estimate
              using your power supply&apos;s wattage rating as an upper bound,
              or look up your specific CPU and GPU&apos;s rated power draw (TDP)
              online.
            </p>
          </div>
        </div>
        </article>
      </main>
      <Footer idioma="en" />
    </div>
  );
}
