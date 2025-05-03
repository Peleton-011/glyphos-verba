<script setup lang="ts">
import Background from "~/components/Background.vue";

const isProduction = process.env.NODE_ENV === "production";
</script>

<template>
  <!-- Background -->
  <Background />
  <!-- Navigation -->
  <header>
    <Navigation />
  </header>
  <!-- Content -->
  <DevLookingGlass v-if="!isProduction" />
  <hr />
  <NuxtPage />
</template>
