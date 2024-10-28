<script setup lang="ts"></script>

<template>
  <div>
    <Navbar/>
    <div class="container mx-auto w-full py-8 space-y-8">
      <div class="bg-white  rounded-lg p-8">
        <slot />
      </div>
    </div>
  </div>
</template>
