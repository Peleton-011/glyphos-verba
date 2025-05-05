<script setup lang="ts">
import Background from "~/components/Background.vue";

const isProduction = process.env.NODE_ENV === "production";
const route = useRoute();
</script>

<template>
  <!-- Background -->
  <Background />
  <!-- Navigation -->
  <header v-if="route.path !== '/'">
    <Navigation />
  </header>
  <!-- Content -->
  <!-- <DevLookingGlass v-if="!isProduction" /> -->
  <!-- <hr /> -->
  <NuxtPage />
</template>
