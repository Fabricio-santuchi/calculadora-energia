import { fireEvent, render, screen } from "@testing-library/react";
import Calculadora from "./calculadora-form";
import { TEXTOS } from "@/lib/textos";

function definirIdiomaDoNavegador(tag: string) {
  Object.defineProperty(window.navigator, "language", {
    value: tag,
    configurable: true,
  });
}

describe("Calculadora", () => {
  beforeEach(() => {
    // O padrão do jsdom é "en-US", que detectaria os EUA e trocaria a moeda
    // sem querer nos testes em português. Fixamos em pt-BR (mesmo país do
    // padrão da página em português) pra não interferir nos testes abaixo.
    definirIdiomaDoNavegador("pt-BR");
  });

  test("renderiza sem quebrar", () => {
    render(<Calculadora idioma="pt" />);
    expect(screen.getByLabelText(TEXTOS.pt.potencia)).toBeInTheDocument();
  });

  test("campo vazio mostra travessão, nunca 0,00", () => {
    render(<Calculadora idioma="pt" />);
    const tracos = screen.getAllByText("—");
    expect(tracos.length).toBeGreaterThan(0);
    expect(screen.queryByText(/0,00/)).not.toBeInTheDocument();
  });

  test("calcula ao vivo, sem clicar em nada (caso conhecido: 300W, 8h, 0,75)", () => {
    render(<Calculadora idioma="pt" />);

    const potencia = screen.getByLabelText(TEXTOS.pt.potencia);
    const tempo = screen.getByLabelText(TEXTOS.pt.tempoHoras);
    const tarifa = screen.getByLabelText(TEXTOS.pt.tarifa);

    fireEvent.change(potencia, { target: { value: "300" } });
    fireEvent.change(tempo, { target: { value: "8" } });
    fireEvent.change(tarifa, { target: { value: "0,75" } });

    expect(screen.getByText(/R\$\s?54,75/)).toBeInTheDocument(); // mensal
    expect(screen.getByText(/R\$\s?1,80/)).toBeInTheDocument(); // por dia
    expect(screen.getByText(/R\$\s?657,00/)).toBeInTheDocument(); // por ano
    expect(screen.getByText(/R\$\s?0,22/)).toBeInTheDocument(); // por hora (0,225 vira 0,22: ponto flutuante)
    expect(screen.getByText(/73\.0 kWh|73,0 kWh/)).toBeInTheDocument();
  });

  test("resultado some (vira travessão) se um campo for apagado depois", () => {
    render(<Calculadora idioma="pt" />);

    const potencia = screen.getByLabelText(TEXTOS.pt.potencia);
    const tempo = screen.getByLabelText(TEXTOS.pt.tempoHoras);
    const tarifa = screen.getByLabelText(TEXTOS.pt.tarifa);

    fireEvent.change(potencia, { target: { value: "300" } });
    fireEvent.change(tempo, { target: { value: "8" } });
    fireEvent.change(tarifa, { target: { value: "0,75" } });
    expect(screen.getByText(/R\$\s?54,75/)).toBeInTheDocument();

    fireEvent.change(potencia, { target: { value: "" } });

    expect(screen.queryByText(/R\$\s?54,75/)).not.toBeInTheDocument();
    expect(screen.getAllByText("—").length).toBeGreaterThan(0);
  });

  test("detecta o país pelo idioma do navegador (en-GB vira Reino Unido)", () => {
    definirIdiomaDoNavegador("en-GB");
    render(<Calculadora idioma="en" />);

    // O padrão do idioma "en" seria EUA (tarifa 0.16). Como detectamos
    // en-GB, o campo devia trocar sozinho pra tarifa do Reino Unido (0.28).
    const tarifa = screen.getByLabelText(
      TEXTOS.en.tarifa,
    ) as HTMLInputElement;
    expect(tarifa.value).toBe("0.28");
  });
});
