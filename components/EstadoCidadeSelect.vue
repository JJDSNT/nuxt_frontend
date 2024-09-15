<template>
  <div v-if="dadosCarregados" class="flex space-x-4">
    <!-- Mostra o dropdown após os dados serem carregados -->
    <div class="flex-1">
      <select v-model="estadoSelecionadoWatcher" class="p-2 border border-gray-300 rounded-md inline-block min-w-0">
        <option disabled value="">Selecione um estado ...</option>
        <option v-for="estado in estados" :key="estado.codigo" :value="estado">{{ estado.sigla }}</option>
      </select>
    </div>

    <div class="flex-1">
      <select v-model="cidadeSelecionadaWatcher" class="p-2 border border-gray-300 rounded-md inline-block min-w-0">
        <option disabled value="">Selecione uma cidade ...</option>
        <option v-for="cidade in cidadesFiltradas" :key="cidade.codigo" :value="cidade">{{ cidade.nome }}</option>
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
  codigoEstado: number; 
}

interface Estado {
  codigo: number;
  nome: string;
  sigla: string;
  pais: { codigo: number; nome: string };
  cidades: Cidade[];
}

// Acessa o store
const infoStore = useInfoStore();

// Computed properties para estado e cidade selecionados no store
const estadoSelecionadoWatcher = computed({
  get: () => estadoSelecionadoLocal.value || '',
  set: (estado: Estado) => {
    estadoSelecionadoLocal.value = estado;
    infoStore.setEstado({
      codigo: estado.codigo,
      nome: estado.nome,
      sigla: estado.sigla,
    }); // Armazena apenas as informações necessárias na store
    infoStore.setPais(estado.pais);
    atualizarCidades();
  }
});


const cidadeSelecionadaWatcher = computed({
  get: () => infoStore.cidadeSelecionada || '',
  set: (cidade: Cidade) => {
    infoStore.setCidade(cidade); // Armazena o objeto completo da cidade
  }
});

// Lista de estados e cidades filtradas
const estadoSelecionadoLocal = ref<Estado | null>(null);
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
  const estadoSelecionado = estadoSelecionadoLocal.value;
  if (estadoSelecionado) {
    cidadesFiltradas.value = estadoSelecionado.cidades || [];
    const cidadeCapital = estadoSelecionado.cidades.find((cidade: Cidade) => cidade.capital);
    infoStore.setCidade(cidadeCapital || cidadesFiltradas.value[0] || null);
  } else {
    cidadesFiltradas.value = [];
    infoStore.setCidade(null); // Reseta a cidade se nenhum estado for selecionado
  }
}


// Sincronizar dados com a store
function sincronizarDadosComStore() {
  const estadoSelecionado = infoStore.estadoSelecionado;
  if (estadoSelecionado) {
    atualizarCidades();
  }

  const cidadeSelecionada = cidadesFiltradas.value.find(c => c.codigo === infoStore.cidadeSelecionada?.codigo);
  if (!cidadeSelecionada && cidadesFiltradas.value.length > 0) {
    infoStore.setCidade(cidadesFiltradas.value[0]); // Define a primeira cidade se nenhuma estiver selecionada
  }
}
</script>
