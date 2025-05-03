<script setup lang="ts">
const isProduction = process.env.NODE_ENV === "production";
</script>

<template>
  <!-- Background -->
  <div class="h-screen w-screen fixed bg-black l-0 t-0 -z-10 overflow-hidden">
    <div class="absolute -inset-[100px] opacity-50">
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse"
      ></div>
      <div
        class="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse"
      ></div>
      <div
        class="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse"
      ></div>
    </div>
  </div>
  <!-- Navigation -->
  <header>
    <Navigation />
  </header>
  <!-- Content -->
  <DevLookingGlass v-if="!isProduction" />
  <hr />
  <NuxtPage />
</template>
