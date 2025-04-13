<script setup>
// If this was a proper API endpoint:
// const { data: wordbank } = await useFetch("/data/wordbank-v1.json");
// but this would need a /server/api/wordbank.ts something like:
/*
import wordbank from '~/server/data/wordbank-v1.json'

export default defineEventHandler(() => {
  return wordbank
})
*/

import wordbank from "~/server/data/wordbank-v1.json";

const categories = Object.keys(wordbank);
</script>

<template>
  <h3>This is the Development Looking Glass</h3>
  <p>If you see this and you are not a developer, then something is wrong</p>
  <div>{{ categories }}</div>
</template>
