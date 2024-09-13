<template>
  <div>
    <!-- Exibe informações selecionadas -->
    <p>O Estado selecionado é: {{ estadoSelecionado || 'Nenhum' }}</p>
    <p>A Cidade selecionada é: {{ cidadeSelecionada || 'Nenhuma' }}</p>
    <p>O Eixo selecionado é: {{ selectedEixo }}</p>

    <!-- Verifica se o eixo selecionado existe e possui indicadores -->
    <template v-if="selectedEixoObj && selectedEixoObj.indicadores && selectedEixoObj.indicadores.length > 0">
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <!-- Renderiza um MetricsCard para cada indicador do eixo selecionado -->
        <MetricsCard
          v-for="indicador in selectedEixoObj.indicadores"
          :key="indicador.id"
          :indicador="indicador"
          :selectedLocalidade="cidadeSelecionada ?? undefined"
        />
      </div>
    </template>
    <p v-else>Nenhum indicador disponível para o eixo selecionado.</p>
  </div>
</template>


<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue';
import MetricsCard from './MetricsCard.vue';
import { useNuxtApp } from '#app';
import { useInfoStore } from '@/stores/useInfoStore';
import type { AxiosInstance } from 'axios';

// Acessa o store para os valores globais
const infoStore = useInfoStore();

// Variáveis reativas gerenciadas pelo store
const estadoSelecionado = computed(() => {
  return infoStore.estadoSelecionado;
});

const cidadeSelecionada = computed(() => {
  return infoStore.cidadeSelecionada;
});

const selectedEixo = computed(() => {
  return infoStore.eixoSelecionado;
});

// Tipo para indicadores e eixos
interface Indicador {
  id: number;
  nome: string;
  valor?: number;
}

interface Eixo {
  id: number | string;
  nome: string;
  indicadores?: Indicador[];
}

// Lista local de eixos
const eixos = ref<Eixo[]>([]);

// Função para buscar os indicadores de eixos da API
const fetchIndicadores = async () => {
  try {
    const { $httpClient } = useNuxtApp();
    const httpClient = $httpClient as AxiosInstance;

    console.log('Buscando indicadores de eixos da API...');
    const response = await httpClient.get('/eixos/indicadores');
    eixos.value = response.data.eixos || [];
    console.log('Indicadores de eixos recebidos:', eixos.value);
  } catch (error) {
    console.error('Erro ao buscar os eixos:', error);
  }
};

// Computed property para encontrar o eixo selecionado
const selectedEixoObj = computed(() => {
  if (eixos.value.length > 0 && selectedEixo.value) {
    const eixoEncontrado = eixos.value.find((eixo) => eixo.id === selectedEixo.value) || null;
    console.log('Eixo encontrado:', eixoEncontrado);
    return eixoEncontrado;
  }
  console.log('Nenhum eixo selecionado ou eixos não disponíveis.');
  return null; // Retornar null se não houver eixos disponíveis ou selecionados
});

// Observa mudanças no eixo selecionado para depuração
watch(selectedEixo, (newValue, oldValue) => {
  console.log('Eixo selecionado mudou de', oldValue, 'para', newValue);
});

// Carrega os indicadores ao montar o componente
onMounted(() => {
  console.log('Componente montado, iniciando busca de indicadores.');
  fetchIndicadores();
});
</script>

<style scoped>
/* Estilos personalizados podem ser adicionados aqui */
</style>
