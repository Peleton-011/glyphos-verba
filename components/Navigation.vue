<template>
  <nav class="flex gap-4 p-4">
    <NuxtLink
      v-if="$route.path !== '/'"
      to="/"
      class="p-1 font-serif font-bold tracking-wider text-4xl hover:cursor-pointer lines"
      >Glyphos Verba</NuxtLink
    >
    <ul class="flex gap-4">
      <li class="btn-like" :class="{ active: $route.path === '/oracle' }">
        <NuxtLink to="/oracle">See the Oracle</NuxtLink>
      </li>
      <li class="btn-like" :class="{ active: $route.path === '/deck' }">
        <NuxtLink to="/deck">The Deck</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
