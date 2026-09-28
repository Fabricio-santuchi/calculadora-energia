import Calculadora from "@/components/calculadora-form";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header idioma="pt" ativo="aparelhos" />
      <main className="flex flex-1 items-center justify-center bg-background px-4 py-12">
        <Calculadora idioma="pt" />
      </main>
      <Footer idioma="pt" />
    </div>
  );
}
