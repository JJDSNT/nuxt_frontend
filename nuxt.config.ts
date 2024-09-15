// https://nuxt.com/docs/api/configuration/nuxt-config
// https://stackoverflow.com/questions/76800021/i-want-to-get-rid-of-this-where-nuxt3-starts-for-the-first-time
// https://stackoverflow.com/questions/76693564/how-do-i-disable-nuxt3-default-loading-indicator
// https://nuxt.com/docs/api/nuxt-config#spaloadingtemplate
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss','@nuxt/test-utils/module'],
  plugins: ['~/plugins/backendCheck.js']
})