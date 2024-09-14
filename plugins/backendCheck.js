export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.hook('app:beforeMount', async () => {
    try {
      // Obtém a baseURL da configuração de ambiente usando useRuntimeConfig
      const { public: { BASE_URL } } = useRuntimeConfig();
      const baseURL = BASE_URL || "http://localhost:8080/api";
      const url = `${baseURL}/health-check`;

      // Loga a URL antes de fazer a requisição
      console.log(`Fazendo requisição para: ${url}`);

      // Faz a requisição ao backend usando fetch e captura a resposta
      const response = await $fetch(url);

      // Loga a resposta da requisição
      console.log('Resposta da requisição:', response);

    } catch (error) {
      // Loga o erro para depuração
      console.error('Erro durante a requisição:', error);

      // Se falhar, redireciona para a página de manutenção
      nuxtApp.$router.push('/maintenance');
    }
  });
});
