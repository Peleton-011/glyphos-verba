<template>
  <nav class="flex gap-4 p-4">
    <ul class="flex gap-4">
      <li><NuxtLink to="/oracle">See the Oracle</NuxtLink></li>
      <li><NuxtLink to="/deck">The Deck</NuxtLink></li>
    </ul>
  </nav>
</template>

<style scoped>
li {
  @apply z-20 p-3 text-sm bg-purple-300 text-black border rounded shadow-lg w-64 hover:cursor-pointer hover:scale-105 transition-transform;
}
</style>
