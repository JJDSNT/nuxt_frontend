import { defineStore } from "pinia";

// Definição das interfaces
export interface Pais {
  codigo: number;
  nome: string;
}

export interface Estado {
  codigo: number;
  nome: string;
  sigla: string;
}

export interface Cidade {
  codigo: number;
  nome: string;
  codigoEstado: number;
  capital?: boolean;
}

export interface Indicador {
  id: number;
  nome: string;
  descricao: string;
  fonte: string | null;
  eixo: string | null;
}

export enum Eixos {
  SAUDE = 1,
  EDUCACAO = 2,
  ASSISTENCIA_SOCIAL = 3,
  SEGURANCA = 4,
  MEIO_AMBIENTE = 5,
  ECONOMIA = 6,
  GOVERNANCA = 7,
  PERSONALIZADO = 8
}

export const useInfoStore = defineStore("info", {
  state: () => ({
    eixoSelecionado: null as Eixos | null,
    paisSelecionado: null as Pais | null,
    estadoSelecionado: null as Estado | null, // Objeto completo de Estado, sem cidades
    cidadeSelecionada: null as Cidade | null, // Objeto completo de Cidade
  }),
  getters: {
    // Getter para retornar nome do estado diretamente
    estadoNome: (state) => state.estadoSelecionado?.nome ?? 'Não informado',
    // Getter para retornar nome da cidade diretamente
    cidadeNome: (state) => state.cidadeSelecionada?.nome ?? 'Não informado',
  },
  actions: {
    setEixo(eixo: Eixos | null) {
      this.eixoSelecionado = eixo;
    },
    setPais(pais: Pais | null) {
      this.paisSelecionado = pais;
    },
    setEstado(estado: Estado | null) {
      this.estadoSelecionado = estado;
    },
    setCidade(cidade: Cidade | null) {
      this.cidadeSelecionada = cidade;
    },
  },
});
