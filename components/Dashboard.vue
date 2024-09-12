<template>
  <div class="container mx-auto">
    <!-- Botão Eixo  -->
    <EixoButton />

    <!-- Cabeçalho com Dropdown de Estado e Cidade <DropdownCombo />-->
    <header class="bg-gray-200 p-4 flex rounded-lg">
      <div style="max-width: 100%;">
        
      </div>
    </header>

    <!-- Dropdown de Eixo <EixoDropdown /> -->
    

    <hr />

    <!-- Cartões de Métricas <MetricsCards /> -->
    
  </div>
</template>

<script setup lang="ts">
// Importando os componentes como no React
import DropdownCombo from '~/components/EstadoCidadeSelect.vue';
import EixoButton from '~/components/EixosButtonCard.vue';
//import EixoDropdown from '~/components/EixoDropdown.vue';
//import MetricsCards from '~/components/MetricsCards.vue';

// Importando o estado da store (em Vue você usaria Pinia ou Vuex)
//import { useInfoStore } from '~/stores/useInfoStore';

// Usando o Pinia para gerenciar o estado global
//const { estadoSelecionado, cidadeSelecionada, eixoSelecionado, setEstado, setCidade, setEixo } = useInfoStore();
</script>

<style scoped>
/* Estilos adicionais podem ser adicionados aqui, se necessário */
</style>