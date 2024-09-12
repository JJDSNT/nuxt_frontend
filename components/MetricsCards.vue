<template>
    <div>
        <!-- Verifica se o eixo selecionado existe -->
        <template v-if="selectedEixo">
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <!-- Renderiza um MetricsCard para cada indicador do eixo selecionado -->
                <MetricsCard v-for="indicador in selectedEixo.indicadores" :key="indicador.id" :indicador="indicador"
                    :selectedLocalidade="cidadeSelecionada" />
            </div>
        </template>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import MetricsCard from './MetricsCard';
import httpClient from '@/app/utils/httpClient'; // Altere para o caminho correto

export default {
    components: {
        MetricsCard
    },
    setup() {
        const eixos = ref([]);
        const eixoSelecionado = ref(null);
        const estadoSelecionado = ref(null);
        const cidadeSelecionada = ref(null);

        // Função para buscar os indicadores de eixos da API
        const fetchIndicadores = async () => {
            try {
                const response = await httpClient.get('/api/indicadores/eixo');
                eixos.value = response.data.eixos;
            } catch (error) {
                console.error('Erro ao buscar os eixos:', error);
            }
        };

        // Busca os indicadores assim que o componente é montado
        onMounted(() => {
            fetchIndicadores();
        });

        // Computed property para encontrar o eixo selecionado
        const selectedEixo = computed(() => eixos.value.find(eixo => eixo.id === eixoSelecionado.value));

        return {
            eixos,
            eixoSelecionado,
            cidadeSelecionada,
            selectedEixo
        };
    }
};
</script>

<style scoped>
/* Adicione o estilo desejado aqui */
</style>