<template>
    <div class="maintenance">
        <h1>Estamos em manutenção</h1>
        <p>Nosso sistema está temporariamente fora do ar. Por favor, tente novamente mais tarde.</p>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const { public: { BASE_URL } } = useRuntimeConfig();
const baseURL = BASE_URL || "http://localhost:8080/api";
const url = `${baseURL}/health-check`;

onMounted(async () => {
    try {
        // Tenta realizar a requisição ao endpoint de healthcheck
        const response = await axios.get(url)
        if (response.status === 200) {
            // Se o backend estiver no ar, redireciona para a página inicial
            router.push('/')
        }
    } catch (error) {
        // Se houver erro (backend fora do ar), a página continua em modo manutenção
        console.error('Backend indisponível, permanecendo na página de manutenção')
    }
})

// Configura o título da página e meta tags
useHead({
    title: 'ObservaTudo em manutenção',
    meta: [
        { name: 'description', content: 'Página de manutenção' },
    ],
})
</script>

<style scoped>
.maintenance {
    text-align: center;
    padding: 50px;
}
</style>
