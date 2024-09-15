// Definição das interfaces
export interface Pais {
  codigo: number;
  nome: string;
}

export interface Estado {
  codigo: number;
  nome: string;
  sigla: string;
  cidades?: Cidade[];
}

export interface Cidade {
  codigo: number;
  nome: string;
  codigoEstado: number;
  capital?: boolean;
}

export interface Indicador {
  fonte: string | null;
  id: number;
  nomeIndicador: string;
  descricao: string;
  eixo: string | null;
  valores?: Valor[];
}

interface Valor {
  data: string;
  valor: number;
}

export enum Eixos {
  SAUDE = 1,
  EDUCACAO = 2,
  ASSISTENCIA_SOCIAL = 3,
  SEGURANCA = 4,
  MEIO_AMBIENTE = 5,
  ECONOMIA = 6,
  GOVERNANCA = 7,
  PERSONALIZADO = 8,
}
