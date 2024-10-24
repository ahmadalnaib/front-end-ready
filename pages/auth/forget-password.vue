<script setup lang="ts">
definePageMeta({
  middleware: ['sanctum:guest'],
});

const { forgotPassword } = useAuth();
const { refreshIdentity } = useSanctumAuth();


const form = reactive<ForgoetPassowrdform>({
  email: '',
});


const errors = ref<validationErrors>({});

const submit = async () => {
  try {
    await forgotPassword(form);
  } catch (e: any) {
    if (e.statusCode === 422) {
      errors.value = e.data.errors;
    }
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center">Forgot Password</h2>
      <form @submit.prevent="submit">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              v-model="form.email"
              type="email"
              id="email"
              class="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email[0] }}
            </p>
          </div>
          <button
            type="submit"
            class="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Send Password Reset Link
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ ' ' }}
        <nuxt-link
          :to="`/auth/register`"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Register Here</nuxt-link
        >
      </p>
    </div>
  </div>
</template>
