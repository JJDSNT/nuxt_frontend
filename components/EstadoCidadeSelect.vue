<template>
  <div v-if="dadosCarregados" class="flex space-x-4"> <!-- Mostra o dropdown após dados carregados -->
    <div class="flex-1">
      <select v-model="estadoSelecionado" @change="atualizarCidades"
        class="p-2 border border-gray-300 rounded-md inline-block min-w-0">
        <option disabled value="">Selecione um estado ...</option>
        <option v-for="estado in estados" :key="estado.codigo" :value="estado.codigo">{{ estado.sigla }}</option>
      </select>
    </div>

    <div class="flex-1">
      <select v-model="cidadeSelecionada" class="p-2 border border-gray-300 rounded-md inline-block min-w-0">
        <option disabled value="">Selecione uma estado ...</option>
        <option v-for="cidade in cidadesFiltradas" :key="cidade.codigo" :value="cidade.codigo">{{ cidade.nome }}
        </option>
      </select>
    </div>
  </div>
  <p v-else>Carregando dados...</p>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app'; // Para acessar o $httpClient do Nuxt
import type { AxiosInstance } from 'axios';

interface Cidade {
  codigo: number;
  nome: string;
  capital?: boolean; // Campo opcional, caso nem todas as cidades tenham a propriedade 'capital'
}

interface Estado {
  codigo: number;
  nome: string;
  sigla: string;
  cidades: Cidade[];
}

const estados = ref<Estado[]>([]); // Definindo explicitamente o tipo como array de 'Estado'
const estadoSelecionado = ref<number | '' >(''); // Permite 'number' ou string vazia para o valor inicial
const cidadeSelecionada = ref<number | '' >(''); // O mesmo para cidade
const cidadesFiltradas = ref<Cidade[]>([]); // Definindo explicitamente o tipo como array de 'Cidade'
const dadosCarregados = ref(false);

// Carregar os dados ao montar o componente
onMounted(async () => {
  await carregarDados();
});

// Função para carregar estados e cidades do backend
async function carregarDados() {
  const { $httpClient } = useNuxtApp(); // Usando o $httpClient configurado no Nuxt
  const httpClient = $httpClient as AxiosInstance; // Definindo o tipo do $httpClient como AxiosInstance
  try {
    const response = await httpClient.get('/localidades/estados-cidades');
    if (response.status === 200 && Array.isArray(response.data)) {
      estados.value = response.data;
      estadoSelecionado.value = ''; // Valor inicial vazio para mostrar o placeholder
      cidadeSelecionada.value = ''; // Valor inicial vazio para a cidade
      dadosCarregados.value = true; // Marca os dados como carregados
    }
  } catch (error) {
    console.error('Erro ao carregar os dados:', error); // Loga o erro no console
  }
}

// Função para atualizar as cidades com base no estado selecionado
function atualizarCidades() {
  if (estadoSelecionado.value) {
    const estado = estados.value.find(estado => estado.codigo === estadoSelecionado.value);
    if (estado) {
      cidadesFiltradas.value = estado.cidades || [];
      // Seleciona automaticamente a cidade capital, se disponível
      const cidadeCapital = estado.cidades.find(cidade => cidade.capital);
      cidadeSelecionada.value = cidadeCapital ? cidadeCapital.codigo : cidadesFiltradas.value[0]?.codigo || '';
    } else {
      cidadeSelecionada.value = ''; // Reseta a cidade se nenhum estado for encontrado
    }
  } else {
    cidadeSelecionada.value = ''; // Reseta a cidade se nenhum estado for selecionado
  }
}
</script>
