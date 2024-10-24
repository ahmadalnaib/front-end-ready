<script setup lang="ts"></script>

<template>
  <div>
    <Navbar />
    <AdminNavbar />
    <div class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </div>
  </div>
</template>
