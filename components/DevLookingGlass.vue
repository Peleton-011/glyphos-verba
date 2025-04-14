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
import cards from "~/server/data/cards-v1.json";
import { ref } from "vue";

const cardList = ref(
  Object.entries(cards).map(([name, meanings]) => ({
    name,
    ...meanings,
  }))
);

const categories = Object.keys(wordbank);

const fullCardList = [
  "mvsicha",
  "octava spera",
  "papa",
  "peranza",
  "philosofia",
  "poesia",
  "polimnia",
  "prima cavsa",
  "primo mobile",
  "prvdencia",
  "re",
  "satvrno",
  "sol",
  "talia",
  "temperancia",
  "terpsicore",
  "theologia",
  "venvs",
  "vrania",
  "zintilomo",
  "apollo",
  "aritmeticha",
  "artixan",
  "caliope",
  "charita",
  "chavalier",
  "chronico",
  "clio",
  "cosmico",
  "doxe",
  "erato",
  "evterpe",
  "fameio",
  "fede",
  "forteza",
  "geometria",
  "grammatica",
  "iliaco",
  "imperator",
  "ivpiter",
  "ivsticia",
  "loica",
  "lvna",
  "marte",
  "melpomeni",
  "merchadante",
  "mercvrio",
];

const missingDescriptions = ref(
  fullCardList
    .filter((name) => !cardList.value.find((card) => card.name === name))
    .join(", ")
);
</script>

<template>
  <div class="p-4 m-4 border-2 border-purple-500 bg-purple-300">
    <h3>This is the Development Looking Glass</h3>
    <p>If you see this and you are not a developer, then something is wrong</p>
    <hr class="bg-purple-500 border-purple-500 m-2" />
    <div><strong>Categories: </strong>{{ categories.join(", ") }}</div>
    <hr v-if="missingDescriptions.length" class="bg-purple-500 border-purple-500 m-2" />
    <div v-if="missingDescriptions.length">
      <strong> Missing Descriptions: </strong>
      {{ missingDescriptions }}
    </div>
  </div>
</template>
