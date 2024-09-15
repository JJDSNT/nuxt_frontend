<template>
  <div class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
    <!-- Exibe os eixos com informações de frontend (cor, icon, etc.) -->
    <button v-for="eixo in eixosFrontend" :key="eixo.id" :style="{ backgroundColor: eixo.cor }"
      :class="['text-black', 'border', 'rounded-lg', 'p-4', 'flex', 'flex-col', 'items-center', 'justify-center', 'space-y-2']"
      @click="handleEixoSelecionado(eixo.id)">
      <v-icon :name="eixo.icon" />
      <span>{{ eixo.nomeLegivel }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import { useInfoStore } from '@/stores/useInfoStore';
import type { AxiosInstance } from 'axios';
import { Eixos } from '@/types/types'; // Importa o enum de Eixos

// Função para converter ícones para kebab-case
const toKebabCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

// Acessa o store
const infoStore = useInfoStore();

// Variáveis para eixos de frontend
const eixosFrontend = ref<{ id: Eixos; nomeLegivel: string; cor: string; icon: string }[]>([]);

// Função para buscar eixos de frontend do backend
const fetchEixosFrontend = async () => {
  const { $httpClient } = useNuxtApp();
  const httpClient = $httpClient as AxiosInstance;
  try {
    const response = await httpClient.get('/eixos/caracteristicas');
    eixosFrontend.value = response.data.map((eixo: any) => ({
      ...eixo,
      id: eixo.id as Eixos, // Certifica que o id corresponde ao enum Eixos
      icon: toKebabCase(eixo.icon) // Converte o ícone para kebab-case
    })); // Armazena eixos de frontend com tipagem correta
  } catch (error) {
    console.error('Erro ao buscar eixos frontend:', error);
  }
};

// Função para tratar a seleção de eixos e armazenar no store
const handleEixoSelecionado = (eixoId: Eixos) => {
  infoStore.setEixo(eixoId); // Armazena o eixo selecionado na store com o tipo correto
};

// Carregar eixos ao montar o componente
onMounted(() => {
  fetchEixosFrontend();
});
</script>

<style scoped>
/* Estilos personalizados podem ser adicionados aqui */
</style>
