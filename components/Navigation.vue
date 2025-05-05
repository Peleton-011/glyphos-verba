<template>
  <nav class="flex justify-center items-center gap-4 p-4">
    <ul class="flex gap-4">
      <li class="btn-outline" :class="{ active: $route.path === '/oracle' }">
        <NuxtLink to="/oracle">See the Oracle</NuxtLink>
      </li>
      <li class="flex" v-if="$route.path !== '/'">
        <NuxtLink to="/" class="p-1 pt-3 hover:cursor-pointer">
          <Logo class="text-5xl" />
        </NuxtLink>
      </li>
      <li class="btn-outline" :class="{ active: $route.path === '/deck' }">
        <NuxtLink to="/deck">The Deck</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
