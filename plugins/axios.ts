import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api", // Defina a URL base aqui
  });

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
