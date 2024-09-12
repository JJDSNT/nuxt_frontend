import { defineStore } from 'pinia';

export const useInfoStore = defineStore('info', {
  state: () => ({
    estadoSelecionado: null,
    cidadeSelecionada: null,
    eixoSelecionado: null,
  }),
  actions: {
    setEstado(estado: any) {
      this.estadoSelecionado = estado;
    },
    setCidade(cidade: any) {
      this.cidadeSelecionada = cidade;
    },
    setEixo(eixo: any) {
      this.eixoSelecionado = eixo;
    }
  }
});
