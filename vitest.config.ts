import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage', // Diretório para armazenar os relatórios de cobertura
      reporter: ['text', 'json-summary', 'lcov'], // Formatos dos relatórios
    },
  },
})


