import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:8080/api", // Defina sua URL base aqui
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptores de resposta para tratamento de erros
httpClient.interceptors.response.use(
  (response) => response, // Retorna a resposta diretamente se for bem-sucedida
  (error) => {
    if (error.response) {
      // Tratamento de erros baseados no código de status da resposta
      switch (error.response.status) {
        case 404:
          console.error("Recurso não encontrado (404)");
          break;
        case 500:
          console.error("Erro interno do servidor (500)");
          break;
        default:
          console.error(`Erro desconhecido: ${error.response.status}`);
      }
    } else if (error.request) {
      // O pedido foi feito, mas não houve resposta
      console.error("Nenhuma resposta recebida do servidor.");
    } else {
      // Outro erro ocorreu durante a configuração da solicitação
      console.error("Erro ao configurar a solicitação:", error.message);
    }
    return Promise.reject(error); // Rejeita a promessa para que o erro possa ser tratado em outro lugar
  }
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("httpClient", httpClient); // Fornece o httpClient como $httpClient globalmente
});
