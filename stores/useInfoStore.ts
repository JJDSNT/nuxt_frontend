import { defineStore } from "pinia";

// Definição das interfaces
export interface Estado {
  codigo: number;
  nome: string;
  sigla: string;
  cidades: Cidade[];
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
    cidadeSelecionada: null as Cidade["codigo"] | null,
    estadoSelecionado: null as Estado["codigo"] | null,
    eixoSelecionado: null as Eixos | null,
  }),
  getters: {
    // Retorna o eixo selecionado diretamente
    eixoCod: (state) => state.eixoSelecionado,
  
    // Retorna o estado selecionado
    codigoEstadoSelecionado: (state) => state.estadoSelecionado,
  },
  actions: {
    setCidade(cidadeCodigo: Cidade["codigo"] | null) {
      this.cidadeSelecionada = cidadeCodigo;
      // Aqui não há inferência de estado, você pode atualizar o estado em outro local
    },
    setEixo(eixo: Eixos | null) {
      this.eixoSelecionado = eixo;
    },
    setEstado(estado: Estado["codigo"] | null) {
      this.estadoSelecionado = estado;
    },
  },
});
