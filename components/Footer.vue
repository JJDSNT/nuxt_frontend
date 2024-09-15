<template>
    <footer class="mt-10 flex flex-col items-center justify-center text-center" style="padding-bottom: 25px;">
        <hr class="w-1/3 my-4 border-gray-300" />
        <p class="mb-2">
            Desenvolvido com ❤️ dedicação e Nuxt(Vue).
        </p>
        <div class="flex items-center">
            <span style="margin-right: 5px;">
                <v-icon name="fa-github" />
            </span>
            <a href="https://github.com/JJDSNT/observatudo" target="_blank" rel="noopener noreferrer">
                Código-fonte
            </a>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { addIcons } from 'oh-vue-icons';
import { FaGithub } from 'oh-vue-icons/icons';

// Registre o ícone globalmente
addIcons(FaGithub);
</script>