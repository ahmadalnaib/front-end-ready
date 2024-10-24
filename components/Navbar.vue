<template>
  <header
    class="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-primary-700 border-b border-neutral-200"
  >
    <div
      class="flex flex-wrap lg:flex-nowrap items-center flex-row justify-start h-full max-w-[1536px] w-full"
    >
      <a
        href="#"
        aria-label="SF Homepage"
        class="inline-block mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
      >
        <NuxtLink to="/">
          <h1 class="text-white font-bold text-xl">Test webshop</h1>
        </NuxtLink>
        <!-- <picture>
            <source srcset="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_white.svg" media="(min-width: 768px)" />
            <img
              src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign_white.svg"
              alt="Sf Logo"
              class="w-8 h-8 md:h-6 md:w-[176px] lg:w-[12.5rem] lg:h-[1.75rem]"
            />
          </picture> -->
      </a>
      <SfButton
        aria-label="Open categories"
        class="text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 lg:hidden order-first lg:order-1 mr-4"
        square
        variant="tertiary"
      >
        <SfIconMenu />
      </SfButton>
      <SfButton
        class="hidden lg:flex text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 lg:mr-4"
        variant="tertiary"
      >
        <template #suffix>
          <SfIconExpandMore class="hidden lg:block" />
        </template>
        <span class="hidden lg:flex whitespace-nowrap">Browse products</span>
      </SfButton>
      <form
        role="search"
        class="flex flex-[100%] order-last lg:order-3 mt-2 lg:mt-0 pb-2 lg:pb-0"
        @submit.prevent="search"
      >
        <SfInput
          v-model="inputValue"
          type="search"
          class="[&::-webkit-search-cancel-button]:appearance-none"
          placeholder="Search"
          wrapper-class="flex-1 h-10 pr-0"
          size="base"
        >
          <template #suffix>
            <span class="flex items-center">
              <SfButton
                variant="tertiary"
                square
                aria-label="search"
                type="submit"
                class="rounded-l-none hover:bg-transparent active:bg-transparent"
              >
                <SfIconSearch />
              </SfButton>
            </span>
          </template>
        </SfInput>
      </form>
      <nav class="flex-1 flex justify-end lg:order-last lg:ml-4">
  <div class="flex flex-row flex-nowrap space-x-4 items-center">
    <div class="flex space-x-2">
      <NuxtLink :to="`/cart`">
        <SfButton   class="text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 mr-2 -ml-0.5 rounded-md"  variant="tertiary" square>
          <template #suffix>
            <SfIconShoppingCart />
          </template>
          Cart
        </SfButton>
      </NuxtLink>
      <NuxtLink :to="`/wishlist`">
        <SfButton  class="text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 mr-2 -ml-0.5 rounded-md"  variant="tertiary" square>
          <template #suffix>
            <SfIconFavorite />
          </template>
          Wishlist
        </SfButton>
      </NuxtLink>
    </div>
    <div v-if="isAuthenticated" class="flex items-center space-x-2">
      <NuxtLink :to="`/dashboard`">
        <SfButton  class="text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 mr-2 -ml-0.5 rounded-md"  variant="tertiary" square>
          <template #suffix>
            <SfIconPerson />
          </template>
          Dashboard
        </SfButton>
      </NuxtLink>
      <SfButton 
  @click="logoutFun" 
  class="text-white hover:text-white hover:bg-red-600 active:bg-red-700 mr-2 rounded-md whitespace-nowrap" 
  variant="tertiary" 
  square
>
  Sign out
</SfButton>
    </div>
    <div v-if="!isAuthenticated" class="flex items-center space-x-2">
      <NuxtLink :to="`/auth/login`">
        <SfButton  class="text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 mr-2 -ml-0.5 rounded-md"  variant="tertiary" square>
          <template #suffix>
            <SfIconPerson />
          </template>
          Login
        </SfButton>
      </NuxtLink>
    </div>
  </div>
</nav>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const { isAuthenticated, logout } = useSanctumAuth();
import {
  SfButton,
  SfIconShoppingCart,
  SfIconFavorite,
  SfIconPerson,
  SfIconExpandMore,
  SfInput,
  SfIconSearch,
  SfIconMenu,
} from '@storefront-ui/vue';

const user = useSanctumUser<User>();

const logoutFun = async () => {
  await logout();
  await navigateTo('/');
};

const actionItems = [
  {
    icon: SfIconShoppingCart,
    ariaLabel: 'Cart',
    role: 'button',
    label: '',
  },
  {
    icon: SfIconFavorite,
    ariaLabel: 'Wishlist',
    role: 'button',
    label: '',
  },
  {
    label: 'Log in',
    icon: SfIconPerson,
    ariaLabel: 'Log in',
    role: 'login',
  },
];

const inputValue = ref('');

const search = () => {
  alert(`Successfully found 10 results for ${inputValue.value}`);
};
</script>
