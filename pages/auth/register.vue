<script setup lang="ts">
definePageMeta({
  middleware: ['sanctum:guest'],
});

const { register } = useAuth();
const { refreshIdentity } = useSanctumAuth();

const form = reactive<Registerform>({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const errors = ref<validationErrors>({});
const loading = ref(false);

const submit = async () => {
  loading.value = true;
  try {
    await register(form);
  } catch (e: any) {
    if (e.statusCode === 422) {
      errors.value = e.data.errors;
    }
  } finally {
    loading.value = false;
  }

  // refresh user
  await refreshIdentity();

  // redirect
  await navigateTo('/dashboard');
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center">Create an account</h2>
      <form @submit.prevent="submit">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Name</label
            >
            <input
              v-model="form.name"
              type="text"
              id="name"
              class="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">
              {{ errors.name[0] }}
            </p>
          </div>
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
              >Confirm Password</label
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
            class="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-indigo-200 flex items-center justify-center"
            :disabled="loading"
          >
            <template v-if="loading">
              <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
              </svg>
            </template>
            <template v-else> Register </template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
