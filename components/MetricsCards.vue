<template>
    <div>
      <!-- Verifica se o eixo selecionado existe -->
      <template v-if="selectedEixo">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <!-- Renderiza um MetricsCard para cada indicador do eixo selecionado -->
          <MetricsCard
            v-for="indicador in selectedEixo.indicadores"
            :key="indicador.id"
            :indicador="indicador"
            :selectedLocalidade="cidadeSelecionada"
          />
        </div>
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useNuxtApp } from '#app'; // Correto uso do httpClient configurado no Nuxt
  import MetricsCard from './MetricsCard';
  
  // Variáveis reativas
  const eixos = ref([]);
  const eixoSelecionado = ref<number | null>(null);
  const estadoSelecionado = ref<number | null>(null);
  const cidadeSelecionada = ref<number | null>(null);
  
  // Função para buscar os indicadores de eixos da API
  const fetchIndicadores = async () => {
    const { $httpClient } = useNuxtApp(); // Usa o cliente HTTP configurado no Nuxt
    try {
      const response = await $httpClient.get('/api/indicadores/eixo');
      eixos.value = response.data.eixos;
    } catch (error) {
      console.error('Erro ao buscar os eixos:', error);
    }
  };
  
  // Computed property para encontrar o eixo selecionado
  const selectedEixo = computed(() => eixos.value.find(eixo => eixo.id === eixoSelecionado.value));
  
  // Busca os indicadores assim que o componente é montado
  onMounted(() => {
    fetchIndicadores();
  });
  </script>
  
  <style scoped>
  /* Adicione o estilo desejado aqui */
  </style>
  