<script setup lang="ts">
definePageMeta({
  middleware: ['sanctum:guest'],
});

import { useRoute } from 'vue-router';
const route = useRoute();

const { sendPasswordConfirmation } = useAuth();

const form = reactive<passwordConfirmation>({
  email: (route.query.email as string) || ' ',
  password: '',
  password_confirmation: '',
  token: (route.query.token as string) || ' ',
});

const errors = ref<validationErrors>({});
const successMessage = ref('');
const resetPassword = async () => {
  try {
    await sendPasswordConfirmation(form);
    successMessage.value = 'Your password has been reset.';
  } catch (e: any) {
    if (e.statusCode === 422) {
      errors.value = e.data.errors;
    }
  }

  setTimeout(async() => {
    successMessage.value = '';
    // refresh user
    await navigateTo({ path: '/auth/login' });
  }, 5000); // Increased timeout duration to 10 seconds
};
</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <div
        v-if="successMessage"
        class="mt-4 p-4 bg-green-100 text-green-800 rounded"
      >
        {{ successMessage }}
      </div>
      <h2 class="text-2xl font-bold text-center">Reset Password</h2>
      <form @submit.prevent="resetPassword">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              v-model="form.email"
              type="email"
              id="email"
              disabled
              class="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email[0] }}
            </p>
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              v-model="form.password"
              type="password"
              id="password"
              class="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password[0] }}
            </p>
          </div>
          <div>
            <label
              for="password_confirmation"
              class="block text-sm font-medium text-gray-700"
              >Password confirmation</label
            >
            <input
              v-model="form.password_confirmation"
              type="password"
              id="password_confirmation"
              class="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            <p
              v-if="errors.password_confirmation"
              class="mt-1 text-sm text-red-600"
            >
              {{ errors.password_confirmation[0] }}
            </p>
          </div>

          <button
            type="submit"
            class="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Set Password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
