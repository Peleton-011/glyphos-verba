<script lang="ts" setup>
//Get current route
const route = useRoute();
</script>

<template>
  <nav class="navigation">
    <ul class="flex gap-4">
      <li class="btn-outline" :class="{ active: $route.path === '/oracle' }">
        <NuxtLink to="/oracle">See the Oracle</NuxtLink>
      </li>
      <li class="flex" v-if="$route.path !== '/'">
        <NuxtLink to="/" class="p-1 pt-3 hover:cursor-pointer">
          <Logo class="text-5xl" :class="{ hidden: $route.path === '/' }" />
        </NuxtLink>
      </li>
      <li class="btn-outline" :class="{ active: $route.path === '/deck' }">
        <NuxtLink to="/deck">The Deck</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
