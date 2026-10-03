export interface Dica {
  titulo: string;
  texto: string;
  /** Ícone lucide: gauge, clock, power, thermometer, droplet, door, tv. */
  icone?:
    | "gauge"
    | "clock"
    | "power"
    | "thermometer"
    | "droplet"
    | "door"
    | "tv";
}

export interface ConteudoAparelho {
  /** Vira o <h1> da página. */
  tituloPagina: string;
  /** Um item por parágrafo. Trechos entre **asteriscos** aparecem em negrito. */
  textoApoio: string[];
  /** h2 da coluna de texto. */
  tituloTexto: string;
  /** h2 da seção de dicas. */
  tituloDicas: string;
  /** Exatamente 3. */
  dicas: [Dica, Dica, Dica];
  faq: { pergunta: string; resposta: string }[];

  /** Troca o rótulo padrão do campo de potência (ex: "Potência do chuveiro"). */
  rotuloPotencia?: string;
  /** Nota embaixo do campo de potência. */
  notaPotencia?: string;
  /** Nota embaixo do campo de tempo. */
  notaTempo?: string;
  /** Caixa de explicação entre potência e tempo (só a geladeira usa, por ora). */
  explicacao?: { titulo: string; texto: string };
  /** Troca o aviso padrão ("Valores estimados...") no rodapé do resultado. */
  avisoResultado?: string;
}
