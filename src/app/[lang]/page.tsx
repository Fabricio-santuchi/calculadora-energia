import Calculadora from "@/components/calculadora-form";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Idioma } from "@/lib/numero";

export default async function LangHomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  const idioma: Idioma = lang === "pt" ? "pt" : "en";

  return (
    <div className="flex min-h-screen flex-col">
      <Header idioma={idioma} ativo="aparelhos" />
      <main className="flex flex-1 items-center justify-center bg-background px-4 py-12">
        <Calculadora idioma={idioma} />
      </main>
      <Footer idioma={idioma} />
    </div>
  );
}
