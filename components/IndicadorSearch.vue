<template>
    <div class="flex items-start rounded-3xl border-8 border-red-500 justify-center min-h-screen mt-0">
        <div class="w-full items-start bg-white border-8 border-green-700 rounded-3xl p-8 shadow-lg mt-0">
            <!-- Input de busca -->
            <input v-model="searchTerm" class="w-full border-2 border-gray-300 p-2 rounded-md mb-4" type="text"
                placeholder="Pesquisar indicadores..." @input="handleSearch" />

            <!-- Filtro por Fonte -->
            <select v-model="selectedFonte" class="w-full border-2 border-gray-300 p-2 rounded-md mb-4">
                <option value="">Filtrar por Fonte</option>
                <option v-for="fonte in fontes" :key="fonte" :value="fonte">{{ fonte }}</option>
            </select>

            <!-- Filtro por Eixo -->
            <select v-model="selectedEixo" class="w-full border-2 border-gray-300 p-2 rounded-md mb-4">
                <option value="">Filtrar por Eixo</option>
                <option v-for="eixo in eixos" :key="eixo" :value="eixo">{{ eixo }}</option>
            </select>

            <!-- Exibir indicadores filtrados -->
            <ul v-if="filteredIndicadores.length > 0">
                <li v-for="indicador in filteredIndicadores" :key="indicador.codIndicador" class="border-b p-4">
                    <h3 class="text-lg font-bold">{{ indicador.nomeIndicador }}</h3>
                    <p class="mt-2 text-sm text-gray-600">{{ indicador.descricao || 'Sem descrição disponível' }}</p>
                    <p class="text-sm text-gray-500">Fonte: {{ indicador.fonteNome }}</p>
                </li>
            </ul>

            <div v-else>
                <p v-if="isLoading">Carregando...</p>
                <p v-if="!isLoading && indicadores.length === 0">Nenhum indicador encontrado.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useNuxtApp } from '#app'; // Para acessar o $httpClient do Nuxt
import type { AxiosInstance } from 'axios'; // Importa o tipo de AxiosInstance

// Interface para o tipo de Indicador com base na resposta do backend
interface Indicador {
    fonteNome: string;
    nomeIndicador: string;
    codIndicador: string;
    descricao: string | null;
}

// Função para remover acentos e caracteres especiais
const removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// Variáveis reativas
const indicadores = ref<Indicador[]>([]);
const searchTerm = ref<string>(''); // Termo de busca
const selectedFonte = ref<string>(''); // Filtro por fonte
const selectedEixo = ref<string>(''); // Filtro por eixo
const isLoading = ref<boolean>(true); // Estado de carregamento

const fontes = ref<string[]>([]); // Lista de fontes disponíveis
const eixos = ref<string[]>([]); // Lista de eixos disponíveis

// Função para buscar dados da API
const fetchData = async () => {
    const { $httpClient } = useNuxtApp(); // Usando o $httpClient configurado no Nuxt
    const httpClient = $httpClient as AxiosInstance; // Define o tipo como AxiosInstance

    try {
        // Buscar os indicadores
        const response = await httpClient.get('/indicadores/filtrar');
        indicadores.value = response.data;

        // Popula a lista de fontes com base nos indicadores
        fontes.value = [...new Set(indicadores.value.map(indicador => indicador.fonteNome))];

        // Buscar os eixos dinamicamente
        const responseEixos = await httpClient.get('/eixos');
        eixos.value = responseEixos.data.map((eixo: any) => eixo.nomeLegivel);

        isLoading.value = false; // Define que o carregamento terminou
    } catch (error) {
        console.error('Houve um erro ao buscar os dados:', error);
        isLoading.value = false; // Define que o carregamento terminou com erro
    }
};

// Computed property para indicadores filtrados
const filteredIndicadores = computed(() => {
    return indicadores.value.filter((indicador) => {
        const matchesSearch = removeAccents(indicador.nomeIndicador.toLowerCase()).includes(removeAccents(searchTerm.value.toLowerCase()));
        const matchesFonte = !selectedFonte.value || indicador.fonteNome === selectedFonte.value;
        const matchesEixo = !selectedEixo.value || indicador.codIndicador.includes(selectedEixo.value); // Ajuste se o campo de eixo for diferente

        return matchesSearch && matchesFonte && matchesEixo;
    });
});

// Executa a busca de dados quando o componente é montado
onMounted(() => {
    fetchData();
});

// Função para lidar com a busca
const handleSearch = () => {
    searchTerm.value = removeAccents(searchTerm.value.toLowerCase());
};
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>