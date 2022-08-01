import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-kql'],

  kql: {
    prefix: 'api/kql',
    auth: 'bearer',
  },

  unocss: {
    preflight: true,
    uno: true,
    icons: {
      scale: 1.2,
      extraProperties: {
        position: 'relative',
        display: 'inline-block',
        'vertical-align': 'middle',
        bottom: '0.125ex',
      },
    },
  },

  hooks: {
    'vite:extendConfig'(config, { isServer }) {
      if (isServer) {
        // Workaround for Netlify issue
        // https://github.com/nuxt/framework/issues/6204
        config.build.rollupOptions.output.inlineDynamicImports = true
      }
    },
  },

  typescript: {
    shim: false,
  },
})
