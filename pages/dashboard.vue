<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['sanctum:auth','verified'],
  title: 'Dashboard',
});


</script>

<template>
  <div>
test
  </div>
</template>
