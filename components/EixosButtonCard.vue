<template>
  <div class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
    <button v-for="eixo in eixos" :key="eixo.id" :style="{ backgroundColor: eixo.cor }"
      :class="['text-black', 'border', 'rounded-lg', 'p-4', 'flex', 'flex-col', 'items-center', 'justify-center', 'space-y-2']"
      @click="handleEixoSelecionado(eixo.id)">
      <v-icon :name="eixo.icon" />
      <span>{{ eixo.nomeLegivel }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app'; // Para acessar o cliente HTTP configurado no Nuxt

const eixos = ref([]); // Armazena os eixos

// Função para buscar eixos do backend
const fetchEixos = async () => {
  const { $httpClient } = useNuxtApp(); // Usar o httpClient configurado no Nuxt
  try {
    const response = await $httpClient.get('/eixos/caracteristicas');
    eixos.value = response.data; // Armazena os dados retornados
  } catch (error) {
    console.error('Erro ao buscar eixos:', error); // Loga o erro no console
  }
};

// Função para tratar seleção de eixos
const handleEixoSelecionado = (id) => {
  console.log('Eixo selecionado:', id); // Lida com a seleção do eixo
};

// Carregar eixos ao montar o componente
onMounted(() => {
  fetchEixos();
});
</script>

<style scoped>
/* Adicionar customizações se necessário */
</style>
