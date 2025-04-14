<script setup>
import cards from "~/server/data/cards-v1.json";
import { ref, nextTick, onUnmounted } from "vue";
import { createPopper } from "@popperjs/core";

const route = useRoute();

const drawAmount = route.params.amount;

const fullCardList = ref(
  Object.entries(cards).map(([name, meanings]) => ({
    name,
    ...meanings,
  }))
);

const cardList = ref(
  fullCardList.value
    .sort(() => Math.random() - 0.5)
    .slice(0, drawAmount)
    .map((card) => {
      const isUpright = Math.random() > 0.49;
      return {
        name: card.name,
        ...(isUpright ? card.upright : card.reversed),
        isUpright,
      };
    })
);

const hoveredCard = ref(null);
const popperInstances = new Map();
const tooltipRefs = new Map();
const cardRefs = new Map();

// Track cleanup
onUnmounted(() => {
  popperInstances.forEach((instance) => instance.destroy());
});

const showTooltip = async (cardName) => {
  hoveredCard.value = cardName;
  await nextTick();

  const tooltipEl = tooltipRefs.get(cardName);
  const cardEl = cardRefs.get(cardName);

  if (tooltipEl && cardEl) {
    // Clean up old instance if exists
    popperInstances.get(cardName)?.destroy();

    const instance = createPopper(cardEl, tooltipEl, {
      placement: "top",
      modifiers: [
        { name: "flip", options: { fallbackPlacements: ["bottom"] } },
        { name: "preventOverflow", options: { padding: 8 } },
      ],
    });

    popperInstances.set(cardName, instance);
  }
};

const hideTooltip = (cardName) => {
  hoveredCard.value = null;
  popperInstances.get(cardName)?.destroy();
  popperInstances.delete(cardName);
};
</script>

<template>
  <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 p-4">
    <!-- <MysticCard svgName="re" filter="crystal" color="#00f" />
    <MysticCard svgName="re" filter="glow" color="#ff0" />
    <MysticCard svgName="re" filter="innerShadow" color="#333" /> -->
    <div
      v-for="card in cardList"
      :key="card.name"
      class="relative group"
      @mouseenter="showTooltip(card.name)"
      @mouseleave="hideTooltip(card.name)"
      :ref="(el) => cardRefs.set(card.name, el)"
    >
      <img
        class="w-full transition-transform cursor-pointer bg-white hover:bg-yellow-100 hover:scale-105"
        :class="{ rotated: !card.isUpright }"
        :src="`/cards/${card.name}.svg`"
        :alt="card.name"
      />

      <!-- Tooltip -->
      <div
        v-if="hoveredCard === card.name"
        class="z-20 p-3 text-sm bg-purple-200 bg-opacity-95 text-black border rounded shadow-lg w-64"
        :ref="(el) => tooltipRefs.set(card.name, el)"
      >
        <strong class="block text-lg mb-1 capitalize">{{ card.name }}</strong>
        {{ card.isUpright ? "Upright" : "Reversed" }}
        <div>
          <p class="text-xs italic text-gray-600">
            {{ card.tone }}
          </p>
          <p class="mt-1">{{ card.notes }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  transform: rotate(0deg);
}

.rotated {
  transform: rotate(180deg);
}
</style>
