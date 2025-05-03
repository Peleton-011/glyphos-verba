<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen gap-8">
    <h1 class="font-serif font-bold tracking-wider text-8xl">Glyphos Verba</h1>

    <Navigation />
  </div>
</template>

<style scoped>
h1 {
  text-decoration: underline overline;
}
</style>
