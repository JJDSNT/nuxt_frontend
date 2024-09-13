<template>
  <div v-if="dadosCarregados" class="flex space-x-4">
    <!-- Mostra o dropdown após os dados serem carregados -->
    <div class="flex-1">
      <select v-model="estadoSelecionadoWatcher" class="p-2 border border-gray-300 rounded-md inline-block min-w-0">
        <option disabled value="">Selecione um estado ...</option>
        <option v-for="estado in estados" :key="estado.codigo" :value="estado.codigo">{{ estado.sigla }}</option>
      </select>
    </div>

    <div class="flex-1">
      <select v-model="cidadeSelecionadaWatcher" class="p-2 border border-gray-300 rounded-md inline-block min-w-0">
        <option disabled value="">Selecione uma cidade ...</option>
        <option v-for="cidade in cidadesFiltradas" :key="cidade.codigo" :value="cidade.codigo">{{ cidade.nome }}</option>
      </select>
    </div>
  </div>
  <p v-else>Carregando dados...</p>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useNuxtApp } from '#app';
import { useInfoStore } from '@/stores/useInfoStore';
import { type AxiosInstance } from 'axios';

// Interface para tipos de Cidade e Estado
interface Cidade {
  codigo: number;
  nome: string;
  capital?: boolean;
}

interface Estado {
  codigo: number;
  nome: string;
  sigla: string;
  cidades: Cidade[];
}

// Acessa o store
const infoStore = useInfoStore();

// Computed properties para estado e cidade selecionados no store
const estadoSelecionadoWatcher = computed({
  get: () => infoStore.estadoSelecionado || '',
  set: (codigo: number) => {
    infoStore.setEstado(codigo); // Armazena apenas o código do estado
    atualizarCidades(); // Atualiza as cidades quando o estado é selecionado
  }
});

const cidadeSelecionadaWatcher = computed({
  get: () => infoStore.cidadeSelecionada || '',
  set: (codigoCidade: number) => {
    infoStore.setCidade(codigoCidade); // Armazena apenas o código da cidade
  }
});

// Lista de estados e cidades filtradas
const estados = ref<Estado[]>([]);
const cidadesFiltradas = ref<Cidade[]>([]);
const dadosCarregados = ref(false);

// Carrega os dados ao montar o componente
onMounted(async () => {
  await carregarDados();
  sincronizarDadosComStore();
});

// Função para carregar estados e cidades do backend
async function carregarDados() {
  const { $httpClient } = useNuxtApp();
  const httpClient = $httpClient as AxiosInstance;
  try {
    const response = await httpClient.get('/localidades/estados-cidades');
    if (response.status === 200 && Array.isArray(response.data)) {
      estados.value = response.data;
      infoStore.setEstado(null); // Inicializa sem estado selecionado
      infoStore.setCidade(null); // Inicializa sem cidade selecionada
      dadosCarregados.value = true;
    }
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
}

// Função para atualizar as cidades com base no estado selecionado
function atualizarCidades() {
  const estadoSelecionado = estados.value.find(estado => estado.codigo === infoStore.estadoSelecionado);
  if (estadoSelecionado) {
    cidadesFiltradas.value = estadoSelecionado.cidades || [];
    const cidadeCapital = estadoSelecionado.cidades.find(cidade => cidade.capital);
    infoStore.setCidade(cidadeCapital?.codigo || cidadesFiltradas.value[0]?.codigo || null);
  } else {
    cidadesFiltradas.value = [];
    infoStore.setCidade(null); // Reseta a cidade se nenhum estado for selecionado
  }
}

// Sincronizar dados com a store
function sincronizarDadosComStore() {
  const estadoSelecionado = estados.value.find(e => e.codigo === infoStore.estadoSelecionado);
  if (estadoSelecionado) {
    atualizarCidades();
  }

  const cidadeSelecionada = cidadesFiltradas.value.find(c => c.codigo === infoStore.cidadeSelecionada);
  if (!cidadeSelecionada && cidadesFiltradas.value.length > 0) {
    infoStore.setCidade(cidadesFiltradas.value[0].codigo); // Define a primeira cidade se nenhuma estiver selecionada
  }
}
</script>
