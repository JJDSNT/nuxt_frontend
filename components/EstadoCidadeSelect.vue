<template>
  <div v-if="dadosCarregados" class="flex space-x-4"> <!-- Mostra o dropdown após dados carregados -->
    <div class="flex-1">
      <label for="estado" class="block mb-2 text-sm font-medium text-gray-700">Selecione um Estado</label>
      <select v-model="estadoSelecionado" @change="atualizarCidades"
        class="p-2 border border-gray-300 rounded-md inline-block min-w-0">
        <option v-for="estado in estados" :key="estado.codigo" :value="estado.codigo">{{ estado.sigla }}</option>
      </select>
    </div>

    <div class="flex-1">
      <label for="cidade" class="block mb-2 text-sm font-medium text-gray-700">Selecione uma Cidade</label>
      <select v-model="cidadeSelecionada" class="p-2 border border-gray-300 rounded-md inline-block min-w-0">
        <option v-for="cidade in cidadesFiltradas" :key="cidade.codigo" :value="cidade.codigo">{{ cidade.nome }}
        </option>
      </select>
    </div>
  </div>
  <p v-else>Carregando dados...</p>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

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
const estadoSelecionado = ref<number | null>(null); // O tipo pode ser 'number' ou 'null'
const cidadeSelecionada = ref<number | null>(null); // O tipo pode ser 'number' ou 'null'
const cidadesFiltradas = ref<Cidade[]>([]); // Definindo explicitamente o tipo como array de 'Cidade'
const dadosCarregados = ref(false);

onMounted(async () => {
  await carregarDados();
});

async function carregarDados() {
  try {
    const response = await axios.get('http://localhost:8080/api/localidades/estados-cidades');
    if (response.status === 200) {
      estados.value = response.data;
      if (estados.value.length) {
        estadoSelecionado.value = estados.value[0].codigo;
        atualizarCidades();
      }
      dadosCarregados.value = true; // Dados carregados
    }
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
}

function atualizarCidades() {
  const estado = estados.value.find(estado => estado.codigo === estadoSelecionado.value);
  if (estado) {
    cidadesFiltradas.value = estado.cidades || [];
    const cidadeCapital = estado.cidades.find(cidade => cidade.capital);
    cidadeSelecionada.value = cidadeCapital ? cidadeCapital.codigo : cidadesFiltradas.value[0]?.codigo || null;
  }
}
</script>
