<script setup>
import cards from "~/server/data/cards-v1.json";
import { ref } from "vue";

const cardList = ref(
  Object.entries(cards).map(([name, meanings]) => ({
    name,
    ...meanings,
  }))
);

const hoveredCard = ref(null);
</script>

<template>
  <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 p-4">
    <div
      v-for="card in cardList"
      :key="card.name"
      class="relative group"
      @mouseenter="hoveredCard = card"
      @mouseleave="hoveredCard = null"
    >
      <img
        class="w-full cursor-pointer hover:scale-105 transition-transform"
        :src="`/cards/${card.name}.svg`"
        :alt="card.name"
      />

      <!-- Tooltip -->
      <div
        v-if="hoveredCard?.name === card.name"
        class="absolute z-20 bottom-full mb-2 p-3 text-sm bg-white text-black border rounded shadow-lg w-64"
      >
        <strong class="block text-lg mb-1 capitalize">{{ card.name }}</strong>
        Upright:
        <div class="p-2">
          <p class="text-xs italic text-gray-600">
            {{ card.upright.tone }}
          </p>
          <p class="mt-1">{{ card.upright.notes }}</p>
        </div>
        <hr />
        Reversed:
        <div class="p-2">
          <p class="text-xs italic text-gray-600">
            {{ card.reversed.tone }}
          </p>
          <p class="mt-1">{{ card.reversed.notes }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
