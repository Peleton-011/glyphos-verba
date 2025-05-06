<template>
  <div>
    <div class="p-6 space-y-4 bg-gray-900 text-white rounded-2xl shadow-xl">
      <textarea
        v-model="query"
        placeholder="Ask your question…"
        class="w-full p-2 rounded bg-gray-800 focus:outline-none"
        rows="2"
      />

      <div class="flex items-center space-x-4">
        <label>Cards:</label>
        <input type="range" min="1" max="5" v-model.number="cardCount" />
        <span>{{ cardCount }}</span>
      </div>
    </div>
    <button @click="stepOne">Draw Cards</button>
    <button @click="stepTwo" :disabled="!drawnCards.length">Read the Oracle</button>

    <div v-if="drawnCards.length">
      <p v-for="c in drawnCards" :key="c.name + c.orientation">
        {{ c.name }} ({{ c.orientation }})
      </p>
    </div>

    <div
      v-if="output"
      class="prose prose-invert mt-4 leading-relaxed"
      v-html="formattedOutput"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDraw } from "~/composables/useDraw";
import { useOracle, type CardDraw } from "~/composables/useOracle";

const { drawnCards, draw } = useDraw();
const { output, read } = useOracle();

const query = ref("");
const cardCount = ref(3);

function stepOne() {
	draw(cardCount.value);
}

function stepTwo() {
	read(query.value, drawnCards.value as CardDraw[]);
    console.log(output.value);
}

// format into paragraphs
const formattedOutput = computed(() =>
	output.value
		.split(/(?<=[.?!])\s+/)
		.map((s) => `<p>${s}</p>`)
		.join("")
);
</script>
