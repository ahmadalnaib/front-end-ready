<template>
  <div class="bg-white">
    <div class=" ">


      <div v-if="loading" class="text-gray-500 text-center">Loading...</div>
      <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
      <div v-else>
        <nav class="navbar">
  <ul class="nav-list">
    <li v-for="group in productGroups" :key="group.productgroupid" class="nav-item">
      <a href="#" class="nav-link">{{ parseBezeichnung(group.bezeichnung) }}</a>
      <div class="dropdown-content">
        <div v-if="group.childprodgroups && group.childprodgroups.childprodgroup" v-for="(child, childIndex) in group.childprodgroups.childprodgroup" :key="childIndex">
        
          <p>Product Group ID: {{ child.productgroupid }}</p>
        </div>
      </div>
    </li>
  </ul>
</nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductGroups } from '@/composables/useProductGroups';
import placeholderImage from '@/assets/images/no-imge.svg'; // Import the placeholder image

const productGroups = ref([]);
const loading = ref(true);
const error = ref(null);

const { fetchProductGroups } = useProductGroups();

const parseBezeichnung = (bezeichnung) => {
  const match = bezeichnung.match(/<default>(.*?)<\/default>/);
  return match ? match[1] : bezeichnung;
};

onMounted(async () => {
  try {
    const response = await fetchProductGroups();
 
      productGroups.value = response; 
      console.log('response:', response);
    
  } catch (err) {
    console.error('Error fetching products:', err);
    error.value = 'Error fetching products: ' + err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.navbar {
  background-color: #333;

}

.nav-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  background: #333;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.nav-link:hover {
  background-color: #ddd;
  color: black;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.nav-item:hover .dropdown-content {
  display: block;
}

.dropdown-content p {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content p:hover {
  background-color: #f1f1f1;
}
</style>