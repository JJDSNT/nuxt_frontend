<template>
  <div class="container mx-auto">
    <!-- Botão Eixo -->
    <EixoButton />

    <!-- Cabeçalho com Dropdown de Estado e Cidade -->
    <header class="bg-gray-200 p-4 flex rounded-lg">
      <div style="max-width: 100%;">
        <!-- O DropdownCombo se encarrega de carregar os dados -->
        <DropdownCombo />
      </div>
    </header>

    <hr />
  </div>
</template>

<script setup lang="ts">
import EixoButton from '~/components/EixosButtonCard.vue';
import DropdownCombo from '~/components/EstadoCidadeSelect.vue';
</script>
