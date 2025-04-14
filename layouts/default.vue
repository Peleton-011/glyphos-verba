<script setup lang="ts">
const isProduction = process.env.NODE_ENV === "production";
</script>

<template>
  <header>
    <Navigation />
  </header>
  <DevLookingGlass v-if="!isProduction" />
  <NuxtPage />
</template>
