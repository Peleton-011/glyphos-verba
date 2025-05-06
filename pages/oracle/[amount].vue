<script setup>
import cards from "~/server/data/cards-v1.json";
import { ref, nextTick, onUnmounted } from "vue";

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
</script>

<template>
  <div class="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
    <!-- <MysticCard svgName="re" filter="crystal" color="#00f" />
    <MysticCard svgName="re" filter="glow" color="#ff0" />
    <MysticCard svgName="re" filter="innerShadow" color="#333" /> -->
    <DrawnCard v-for="card in cardList" :key="card.name" :card="card" />
  </div>
</template>
