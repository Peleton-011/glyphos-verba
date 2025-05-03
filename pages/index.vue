<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <Background />
  <!-- Content -->
  <div class="flex flex-col items-center justify-center h-screen gap-8">
    <Logo class="text-6xl" />

    <Navigation />
  </div>
</template>
