<script setup lang="ts">
definePageMeta({
  middleware: ['sanctum:guest'],
});

const { sendForgotPassword } = useForgotPassword();
const form = reactive<ForgortPasswordform>({
  email: ''

});

const errors=ref<validationErrors>({})



const sendForgotPasswordEmail = async () => {
  try {
    await sendForgotPassword(form);
  } catch (e: any) {
    if (e.statusCode === 422) {
      errors.value = e.data.errors;
    }
  }
};


</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center">Recover password</h2>
      <form @submit.prevent="sendForgotPasswordEmail">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="form.email" type="email" id="email" class="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email[0] }}</p>
          </div>
        
      
          <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-indigo-200">Recover password</button>
        </div>
      </form>
     
    </div>
  </div>
</template>