<script setup lang="ts">
definePageMeta({
  middleware: ['sanctum:guest'],
});

const { login } = useSanctumAuth();

const form = reactive<Loginform>({
  email: '',
  password: '',
});

const errors=ref<validationErrors>({})

const submit = async () => {
  try {
    await login(form);
   
  } catch (e:any) {
   if(e.statusCode === 422){
     errors.value=e.data.errors
   }
  }

};
</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center">Sign in to your account</h2>
      <form @submit.prevent="submit">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="form.email" type="email" id="email" class="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email[0] }}</p>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input v-model="form.password" type="password" id="password" class="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password[0] }}</p>
          </div>
          <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
          </div>

          <div class="text-sm leading-6">
            <nuxt-link to="/auth/forget-password" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</nuxt-link>
          </div>
        </div>
          <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-indigo-200">Login</button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ ' ' }}
        <nuxt-link :to="`/auth/register`" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register Here</nuxt-link>
      </p>
    </div>
  </div>
</template>