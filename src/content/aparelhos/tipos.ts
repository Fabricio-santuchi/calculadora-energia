export interface ConteudoAparelho {
  /** Vira o <h1> da página. */
  tituloPagina: string;
  /** Um item por parágrafo. Trechos entre **asteriscos** aparecem em negrito. */
  textoApoio: string[];
  faq: { pergunta: string; resposta: string }[];
}
