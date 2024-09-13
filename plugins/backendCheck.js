export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.hook('app:beforeMount', async () => {
    try {
      // Faz uma requisição ao backend (pode ser uma rota de status)
      await nuxtApp.$axios.get('/health-check'); // Verifica se o backend está disponível
    } catch (error) {
      // Se falhar, redireciona para a página de manutenção
      nuxtApp.$router.push('/maintenance');
    }
  });
});
