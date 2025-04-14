<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen text-8xl gap-8">
    <h1 class="font-serif font-bold tracking-wider">Glyphos Verba</h1>

    <Navigation />
  </div>
</template>

<style scoped>
h1 {
  text-decoration: underline overline;
}
</style>
