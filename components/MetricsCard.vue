<template>
  <div class="metrics-card bg-white rounded-lg shadow-lg p-4">
    <!-- Verifica se o nome do indicador e os valores estão disponíveis -->
    <template v-if="indicador && indicador.nomeIndicador && indicador.valores && indicador.valores.length > 0">
      <h3 class="text-xl font-semibold text-gray-800">{{ indicador.nomeIndicador }}</h3>
      <p class="text-sm text-gray-600">Localidade: {{ selectedLocalidade }}</p>

      <!-- Gráfico dos valores do indicador -->
      <Line :data="chartData" :options="chartOptions" />

    </template>
    <template v-else>
      <!-- Mensagem de dados não disponíveis -->
      <p class="text-red-600">Dados do indicador não disponíveis</p>
      <pre>{{ JSON.stringify(indicador, null, 2) }}</pre>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Indicador } from '~/types/types';
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart, Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

// Registra os componentes do Chart.js que serão usados
Chart.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

// Desestruturação das props com tipos
const { indicador, selectedLocalidade } = defineProps<{
  indicador: Indicador;
  selectedLocalidade?: string;
}>();

// Computed para os dados e opções do gráfico
const chartData = computed(() => ({
  labels: indicador.valores?.map((valor) => formatDate(valor.data)) || [],
  datasets: [
    {
      label: indicador.nomeIndicador,
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50',
      // Garantir que `data` seja sempre um array
      data: indicador.valores?.map((valor) => valor.valor) || [],
      fill: false,
    },
  ],
}));


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Data',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Valor',
      },
    },
  },
};

// Função para formatar a data
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};
</script>

<style scoped>
.metrics-card {
  width: 100%;
  height: 300px;
}
</style>
