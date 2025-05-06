<script lang="ts" setup>
import { createPopper } from "@popperjs/core";

const props = defineProps<{
  card: {
    name: string;
    orientation: Orientation;
    effect: {
      tone: string;
      bias: string[];
      mutation_rate: number;
      template_style: string;
      notes: string;
    };
  };
}>();

const { card: cardProp } = props;

const card = {
  name: cardProp.name,
  isUpright: cardProp.orientation === "upright",
  tone: cardProp.effect.tone,
  notes: cardProp.effect.notes,
};

const hoveredCard = ref<string | null>(null);
const popperInstances = new Map();
const tooltipRefs = new Map();
const cardRefs = new Map();

// Track cleanup
onUnmounted(() => {
  popperInstances.forEach((instance) => instance.destroy());
});

const showTooltip = async (cardName: string) => {
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

const hideTooltip = (cardName: string) => {
  hoveredCard.value = null;
  popperInstances.get(cardName)?.destroy();
  popperInstances.delete(cardName);
};
</script>

<template>
  <div
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
</template>

<style scoped>
img {
  transform: rotate(0deg);
}

.rotated {
  transform: rotate(180deg);
}
</style>
