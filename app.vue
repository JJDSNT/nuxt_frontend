<template>
  <div>
    <NuxtRouteAnnouncer />
    <header>
      <h1>Minha Aplicação</h1>
      <!-- Links de navegação -->
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/indicadores">Pesquisar Indicadores</NuxtLink>
      </nav>
    </header>
    <NuxtPage />
    <Footer />>
  </div>
</template>

<script lang="ts" setup>
import EstadoCidadeSelect from '~/components/EstadoCidadeSelect.vue';

// Não é necessário usar export default com script setup
onMounted(() => {
  console.log(new Date(2019, 2, 2, 11.2));
});
</script>
