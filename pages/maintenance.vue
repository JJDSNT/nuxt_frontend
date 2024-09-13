<template>
    <div class="maintenance">
        <h1>Estamos em manutenção</h1>
        <p>Nosso sistema está temporariamente fora do ar. Por favor, tente novamente mais tarde.</p>
    </div>
</template>

<script setup>
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