<template>
    <div class="w-full">
        <div class="bg-white rounded-lg shadow-lg p-4">
            <template v-if="indicador && indicador.nome">
                <h3 class="text-xl font-semibold text-gray-800">{{ indicador.nome }}</h3>
                <p class="text-sm text-gray-600">{{ indicador.descricao }}</p>
                <template v-if="selectedLocalidade !== null">
                    <ul>
                        <li v-for="valor in sortedValores" :key="valor.id">
                            Data: {{ formatDate(valor.data) }}, Valor: {{ valor.valor }}
                        </li>
                    </ul>
                </template>
                <p v-else>
                    <b>Selecione uma localidade para ver os valores do indicador.</b>
                </p>
            </template>
            <template v-else>
                <div>
                    <p class="text-red-600">Dados do indicador não disponíveis</p>
                    <pre>{{ JSON.stringify(indicador, null, 2) }}</pre>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        indicador: {
            type: Object,
            required: true
        },
        selectedLocalidade: {
            type: Number,
            required: false
        }
    },
    computed: {
        sortedValores() {
            // Filtra os valores de acordo com a localidade selecionada e os ordena por data
            return this.indicador.valoresIndicador
                .filter(valor => valor.localidade.codigo === this.selectedLocalidade)
                .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
        }
    },
    methods: {
        formatDate(date) {
            // Formata a data para exibição
            return new Date(date).toLocaleDateString();
        }
    }
};
</script>