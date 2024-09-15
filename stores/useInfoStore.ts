import { defineStore } from "pinia";
import type { Pais, Estado, Cidade, Eixos } from '~/types/types';

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
