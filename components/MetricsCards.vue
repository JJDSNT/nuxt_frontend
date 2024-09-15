<template>
  <div>
    <!-- Exibe informações do eixo selecionado -->
    <p>Eixo: {{ eixoSelecionado || 'Nenhum eixo selecionado' }}</p>

    <!-- Exibe informações da localidade selecionada -->
    <p>País: {{ paisNome || 'Não informado' }}</p>
    <p>Estado: {{ estadoNome || 'Não informado' }}</p>
    <p>Cidade: {{ cidadeNome || 'Não informado' }}</p>

    <!-- Indicadores do País -->
    <div v-if="indicadoresPais.length > 0">
      <h4 class="text-lg font-semibold mt-4">Indicadores do País {{ paisNomeAPI }}</h4>
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <MetricsCard v-for="indicador in indicadoresPais" :key="indicador.nomeIndicador" :indicador="indicador"
          :selectedLocalidade="paisNome" />
      </div>
    </div>

    <!-- Indicadores do Estado -->
    <div v-if="indicadoresEstado.length > 0">
      <h4 class="text-lg font-semibold mt-4">Indicadores do Estado {{ estadoNomeAPI }}</h4>
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <MetricsCard v-for="indicador in indicadoresEstado" :key="indicador.nomeIndicador" :indicador="indicador"
          :selectedLocalidade="estadoNome" />
      </div>
    </div>

    <!-- Indicadores da Cidade -->
    <div v-if="indicadoresCidade.length > 0">
      <h4 class="text-lg font-semibold mt-4">Indicadores da Cidade {{ cidadeNomeAPI }}</h4>
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <MetricsCard v-for="indicador in indicadoresCidade" :key="indicador.nomeIndicador" :indicador="indicador"
          :selectedLocalidade="cidadeNome" />
      </div>
    </div>

    <!-- Mensagem se não houver indicadores -->
    <p v-else>Nenhum indicador disponível para a localidade selecionada.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useNuxtApp } from '#app'; // Para acessar o axios
import { type AxiosInstance } from 'axios';
import { useInfoStore } from '~/stores/useInfoStore'; // Use o caminho correto da sua store
import MetricsCard from './MetricsCard.vue';

interface Valor {
  data: string;
  valor: number;
}

interface Indicador {
  nomeIndicador: string; // ou 'nome' se for o caso
  valores: Valor[];
}

// Usando a store Pinia
const store = useInfoStore();

// Computed para obter o nome do país, estado e cidade da store
const paisNome = computed(() => store.paisSelecionado?.nome || 'Não informado');
const estadoNome = computed(() => store.estadoSelecionado?.nome || 'Não informado');
const cidadeNome = computed(() => store.cidadeSelecionada?.nome || 'Não informado');

// Arrays para armazenar indicadores por localidade
const indicadoresPais = ref<Indicador[]>([]);
const indicadoresEstado = ref<Indicador[]>([]);
const indicadoresCidade = ref<Indicador[]>([]);

const paisNomeAPI = ref('Não informado');
const estadoNomeAPI = ref('Não informado');
const cidadeNomeAPI = ref('Não informado');

// Computed para obter o eixo selecionado
const eixoSelecionado = computed(() => store.eixoSelecionado);

// Função para carregar os indicadores
async function carregarIndicadores(cidadeId: number) {
  const { $httpClient } = useNuxtApp(); // Acessa o axios
  const httpClient = $httpClient as AxiosInstance;
  try {
    const response = await httpClient.get(`/indicadores/${cidadeId}`);
    if (response.status === 200) {
      console.log('Indicadores carregados com sucesso:', response.data);
      const data = response.data;

      // Computed para obter o nome do país, estado e cidade da API
      paisNomeAPI.value = data.paisNome || 'Não informado';
      estadoNomeAPI.value = data.estadoNome || 'Não informado';
      cidadeNomeAPI.value = data.cidadeNome || 'Não informado';

      // Preenche os arrays de indicadores (somente os indicadores)
      indicadoresPais.value = (data.indicadoresPais || []) as Indicador[];
      indicadoresEstado.value = (data.indicadoresEstado || []) as Indicador[];
      indicadoresCidade.value = (data.indicadoresCidade || []) as Indicador[];
    } else {
      console.error('Erro na resposta ao carregar indicadores:', response.status);
    }
  } catch (error) {
    console.error('Erro ao buscar os indicadores:', error);
  }
}

// Watcher para detectar alterações na cidade selecionada
watch(
  () => store.cidadeSelecionada,
  (novaCidade) => {
    if (novaCidade && novaCidade.codigo) {
      carregarIndicadores(novaCidade.codigo);
    }
  },
  { immediate: true } // Dispara o watch ao montar o componente
);
</script>

<style scoped>
/* Estilos personalizados podem ser adicionados aqui */
</style>
