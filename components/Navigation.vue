<template>
  <nav class="flex justify-center items-center gap-4 p-4">
    <ul class="flex gap-4">
      <li :class="{ active: $route.path === '/oracle' }">
        <NuxtLink to="/oracle">
          <OutlineButton> See the Oracle </OutlineButton>
        </NuxtLink>
      </li>
      <li class="flex" v-if="$route.path !== '/'">
        <NuxtLink to="/" class="p-1 hover:cursor-pointer">
          <Logo class="text-4xl" />
        </NuxtLink>
      </li>
      <li class="btn-like" :class="{ active: $route.path === '/deck' }">
        <NuxtLink to="/deck">The Deck</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
