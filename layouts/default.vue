<script setup lang="ts">
const isProduction = process.env.NODE_ENV === "production";
</script>

<template>
  <header>
    <Navigation />
  </header>
  <DevLookingGlass v-if="!isProduction" />
  <hr />
  <NuxtPage />
</template>

<style>
body {
  /* background-color: #000; */
  /* color: #fff; */
  user-select: none;
}

.section-title {
  @apply font-serif font-bold tracking-wider text-4xl p-4 w-full text-center;
}

.btn-like {
  @apply flex z-20 text-sm bg-purple-300 text-black border rounded shadow-lg w-64 hover:cursor-pointer hover:scale-105 transition-transform;
}
</style>
