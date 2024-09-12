<template>
  <div>
    <NuxtRouteAnnouncer />
    <EstadoCidadeSelect />
  </div>
</template>

<script lang="ts" setup>
import EstadoCidadeSelect from '~/components/EstadoCidadeSelect.vue';

// Não é necessário usar export default com script setup
onMounted(() => {
  console.log(new Date(2019, 2, 2, 11.2));
});
</script>
