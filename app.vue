<script setup>
const isProduction = process.env.NODE_ENV === "production";
</script>

<template>
  <div>
    <DevLookingGlass v-if="!isProduction" />
    <DeckDisplay />
  </div>
</template>
