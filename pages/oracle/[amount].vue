<script setup>
const route = useRoute();

const drawAmount = route.params.amount;

const { drawnCards, draw } = useDraw();

draw(drawAmount);
</script>

<template>
  <div class="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
    <!-- <MysticCard svgName="re" filter="crystal" color="#00f" />
    <MysticCard svgName="re" filter="glow" color="#ff0" />
    <MysticCard svgName="re" filter="innerShadow" color="#333" /> -->
    <DrawnCard v-for="card in drawnCards" :key="card.name" :card="card" />
  </div>
</template>
