<template>
    <Dashboard />
</template>

<script setup>
import Dashboard from '~/components/Dashboard.vue';

useHead({
  title: 'ObservaTudo',
  meta: [
    { name: 'description', content: 'Dashboard de indicadores cívicos' },
  ],
})
</script>