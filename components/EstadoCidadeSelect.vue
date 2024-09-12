<script setup>
import { ref, onMounted } from 'vue';
import { useFetch } from '#app';

const estados = ref([]);
const estadoSelecionado = ref(null);
const cidadeSelecionada = ref(null);
const cidadesFiltradas = ref([]);

onMounted(async () => {
  const { data, error } = await useFetch('/localidades/estados-cidades', {
    baseURL: 'http://localhost:8080/api', // Defina a URL base correta
  });

  if (error.value) {
    console.error('Erro ao buscar os dados de estados e cidades:', error.value);
  } else {
    estados.value = data.value;
    console.log('Dados carregados:', estados.value);
    if (estados.value.length) {
      estadoSelecionado.value = estados.value[0].codigo;
      atualizarCidades();
    }
  }
});

function atualizarCidades() {
  const estado = estados.value.find(estado => estado.codigo === estadoSelecionado.value);
  if (estado) {
    cidadesFiltradas.value = estado.cidades || [];
    const cidadeCapital = estado.cidades.find(cidade => cidade.capital);
    cidadeSelecionada.value = cidadeCapital ? cidadeCapital.codigo : cidadesFiltradas.value[0]?.codigo || null;
  }
}
</script>

<template>
  <div class="flex space-x-4"> <!-- Usar flex para colocar os selects na mesma linha -->
    <div class="flex-1"> <!-- Flex-1 para garantir que ocupem o mesmo espaço -->
      <label for="estado" class="block mb-2 text-sm font-medium text-gray-700">Selecione um Estado</label>
      <select 
        v-model="estadoSelecionado" 
        @change="atualizarCidades" 
        class="p-2 border border-gray-300 rounded-md inline-block min-w-0">
        <option v-for="estado in estados" :key="estado.codigo" :value="estado.codigo">{{ estado.sigla }}</option>
      </select>
    </div>

    <div class="flex-1">
      <label for="cidade" class="block mb-2 text-sm font-medium text-gray-700">Selecione uma Cidade</label>
      <select 
        v-model="cidadeSelecionada" 
        class="p-2 border border-gray-300 rounded-md inline-block min-w-0">
        <option v-for="cidade in cidadesFiltradas" :key="cidade.codigo" :value="cidade.codigo">{{ cidade.nome }}</option>
      </select>
    </div>
  </div>
</template>
