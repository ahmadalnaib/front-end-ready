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
    host: 'http://localhost:8000/'
  },
  modules: ['nuxt-auth-sanctum','@storefront-ui/nuxt'],
  
  sanctum:{
    baseUrl: 'http://localhost:8000/', 
    redirect:{
      onLogin: '/dashboard',
      onAuthOnly: '/auth/login',
      onGuestOnly: '/dashboard',
      // onLogout: '/',

    }
  }

})