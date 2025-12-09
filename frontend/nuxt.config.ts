import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    public: {
      apiBase: process.env.PUBLIC_API_URL || 'http://localhost:3333'
    }
  },

  css: [
    '@/assets/css/base.css'
  ],

  app: {
    head: {
      title: 'Sticker Trade - Copa',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  typescript: {
    strict: true,
    shim: false
  }
})
