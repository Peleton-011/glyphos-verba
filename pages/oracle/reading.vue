<script lang="ts" W setup>
const route = useRoute();

// pull params (fallback if missing)
const query = ref<string>((route.query.q as string) || "");
const cardCount = ref<number>(parseInt(route.query.c as string) || 3);

const { drawnCards, draw } = useDraw();
const { output, read } = useOracle();

onMounted(() => {
  draw(cardCount.value);
  if (query.value === "") return;
  read(query.value, drawnCards.value as CardDraw[]);
});

// format into paragraphs
const formattedOutput = computed(() =>
  output.value
    .split(/(?<=[.?!])\s+/)
    .map((s) => `<p>${s}</p>`)
    .join("")
);
</script>

<template>
  <h1 class="section-title">Your Reading:</h1>

  <div class="max-w-3xl mx-auto px-6 py-12 font-serif">
    <div class="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      <!-- <MysticCard svgName="re" filter="crystal" color="#00f" />
    <MysticCard svgName="re" filter="glow" color="#ff0" />
    <MysticCard svgName="re" filter="innerShadow" color="#333" /> -->
      <!-- Show drawn cards -->
      <DrawnCard v-for="card in drawnCards" :key="card.name" :card="card" />
    </div>
    <div class="space-y-6 text-base leading-relaxed">
      <p
        v-if="output"
        class="prose prose-invert mt-4 leading-relaxed"
        v-html="formattedOutput"
      />
    </div>
  </div>
</template>
