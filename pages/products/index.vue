<template>
    <div>
      <div>
        <h1 class="text-4xl font-bold mb-8 text-center text-gray-900">Product List</h1>
        <div v-if="loading" class="text-gray-500 text-center">Loading...</div>
        <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div v-for="product in products" :key="product.artikelnummer" class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <!-- Display product image if available, otherwise show placeholder -->
              <img 
                :src="product.bilder && product.bilder.bild && product.bilder.bild.base64 ? product.bilder.bild.base64 : placeholderImage" 
                alt="Product Image" 
                class="w-full h-48 object-contain mb-4 rounded-lg" />
              
              <h2 class="text-2xl font-semibold mb-2 text-gray-800 truncate ">{{ product.artikelbezeichnung }}</h2>
              <!-- <p v-html="product.artikellangtext || product.artikelsondertext" class="text-gray-600 mb-4 flex-grow"></p>
              <p class="text-gray-600"><strong>Weight:</strong> {{ product.gewicht }} kg</p>
              <p class="text-gray-600"><strong>Row ID:</strong> {{ product.rowid }}</p>
              <p class="text-gray-600"><strong>Manufacturer ID:</strong> {{ product.herstellerid }}</p>
              <p class="text-gray-600"><strong>Order Number:</strong> {{ product.bestellnummer }}</p> -->
              <p class="text-gray-800 text-xl font-bold mb-4"><strong>Price:</strong> {{ product.preise.preis }} €</p>
              <button class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 mt-auto">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useProducts } from '@/composables/useProducts';
  import placeholderImage from '@/assets/images/no-imge.svg'; // Import the placeholder image
  
  const products = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  const { fetchProducts } = useProducts();
  
  onMounted(async () => {
    try {
      const response = await fetchProducts();
      console.log('response:', response);
      if (Array.isArray(response)) {
        products.value = response; // Assign the entire response if it's an array
      } else {
        error.value = 'Expected an array of products';
        console.error('Unexpected response structure:', response);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      error.value = 'Error fetching products: ' + err.message;
    } finally {
      loading.value = false;
    }
  });
  </script>