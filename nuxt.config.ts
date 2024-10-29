// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devServer:{
    host: 'http://shopp.test/'
  },
  modules: ['nuxt-auth-sanctum','@storefront-ui/nuxt'],
  
  sanctum:{
    baseUrl: 'http://shopp.test/', 
    redirect:{
      onLogin: '/dashboard',
      onAuthOnly: '/auth/login',
      onGuestOnly: '/dashboard',
      // onLogout: '/',

    }
  }

})