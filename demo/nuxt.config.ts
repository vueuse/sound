import soundModule from '../src/nuxt/module'

export default defineNuxtConfig({
  app: {
    head: {
      title: '@vueuse/sound',
    },
  },
  css: ['~/assets/css/index.css'],
  modules: [soundModule as any, '@nuxtjs/tailwindcss', '@nuxt/content', '@vueuse/motion/nuxt'],
  content: {
    documentDriven: true,
    highlight: {
      theme: 'one-dark-pro',
    },
  },
  tailwindcss: {
    viewer: false,
  },
})
