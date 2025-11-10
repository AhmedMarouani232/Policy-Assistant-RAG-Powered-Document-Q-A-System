export default defineNuxtConfig({
  modules: ["@nuxt/ui"],

  css: ['~/assets/main.css'],
  ui: {
    prefix: 'U'
  },
  app: {
    head: {
      title: "AI Assistant Frontend",
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3001", // backend base URL
    },
  },
});