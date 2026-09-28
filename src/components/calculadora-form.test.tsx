import { fireEvent, render, screen } from "@testing-library/react";
import Calculadora from "./calculadora-form";
import { TEXTOS } from "@/lib/textos";
import { aparelhos } from "@/lib/data/aparelhos";
import { tarifas } from "@/lib/data/tarifas";

const chuveiro = aparelhos.find((a) => a.slugPt === "chuveiro")!;
const pcGamer = aparelhos.find((a) => a.slugPt === "pc")!;

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

    // O padrão do idioma "en" seria EUA. Como detectamos en-GB, o campo
    // devia trocar sozinho pra tarifa do Reino Unido.
    const reinoUnido = tarifas.find((t) => t.codigo === "GB")!;
    const tarifa = screen.getByLabelText(
      TEXTOS.en.tarifa,
    ) as HTMLInputElement;
    expect(tarifa.value).toBe(String(reinoUnido.valor));
  });

  test("apertar Enter (enviar o formulário) não recarrega a página", () => {
    const { container } = render(<Calculadora idioma="pt" />);
    const form = container.querySelector("form")!;
    // fireEvent devolve false quando alguém chamou preventDefault().
    expect(fireEvent.submit(form)).toBe(false);
  });

  test("a calculadora usa h2 (o h1 é o título da página do aparelho)", () => {
    render(<Calculadora idioma="pt" />);
    expect(
      screen.getByRole("heading", { level: 2, name: TEXTOS.pt.titulo }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
  });

  test("aparelho em minutos: rótulo em minutos e custo de UM banho", () => {
    render(<Calculadora idioma="pt" aparelho={chuveiro} />);

    // Rótulo do campo e unidade seguem os minutos
    expect(screen.getByLabelText(TEXTOS.pt.tempoMinutos)).toHaveValue("10");
    expect(screen.getByText(TEXTOS.pt.unidadeMinutos)).toBeInTheDocument();

    // 5500 W, 10 min, R$ 1,05 → 0,9625 por banho
    expect(screen.getByText("Por banho de 10 min")).toBeInTheDocument();
    // aparece 2x: por banho e por dia (1 banho de 10 min por dia)
    expect(screen.getAllByText(/R\$\s?0,96/)).toHaveLength(2);
    expect(screen.getByText(/R\$\s?29,28/)).toBeInTheDocument(); // mensal
  });

  test("aparelho em horas continua mostrando 'Por hora de uso'", () => {
    render(<Calculadora idioma="pt" aparelho={pcGamer} />);
    expect(screen.getByLabelText(TEXTOS.pt.tempoHoras)).toHaveValue("4");
    expect(screen.getByText(TEXTOS.pt.porHora)).toBeInTheDocument();
  });

  test("atalhos sem '+' e o atalho igual ao valor atual fica marcado", () => {
    render(<Calculadora idioma="pt" aparelho={chuveiro} />);

    const atalho5500 = screen.getByRole("button", { name: "5500 W" });
    const atalho7500 = screen.getByRole("button", { name: "7500 W" });
    expect(atalho5500).toHaveAttribute("aria-pressed", "true");
    expect(atalho7500).toHaveAttribute("aria-pressed", "false");
    expect(screen.queryByText(/\+/)).not.toBeInTheDocument();

    fireEvent.click(atalho7500);
    expect(atalho7500).toHaveAttribute("aria-pressed", "true");
    expect(atalho5500).toHaveAttribute("aria-pressed", "false");

    // atalho de tempo também
    expect(screen.getByRole("button", { name: "10 min" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  test("o seletor de país mostra o país atual (não fica vazio)", () => {
    render(<Calculadora idioma="pt" />);
    expect(screen.getByText("Brasil (BRL 1,05)")).toBeInTheDocument();
  });
});
