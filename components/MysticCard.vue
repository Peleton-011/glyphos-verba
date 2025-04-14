<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    preserveAspectRatio="xMidYMid meet"
    class="w-full h-auto block"
  >
    <defs ref="defsEl" />
    <path
      v-for="(d, index) in paths"
      :key="index"
      :d="d"
      :fill="color"
      :filter="`url(#${filter})`"
    />
  </svg>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useSvgPaths } from "~/composables/useSvgPaths";
import { useSvgFilters } from "~/composables/useSvgFilters";

const props = defineProps<{
  svgName: string;
  color?: string;
  filter?: "glow" | "crystal" | "innerShadow";
}>();

const color = props.color || "#00ffff";
const filter = props.filter || "glow";

const paths = ref<string[]>([]);
const viewBox = ref("0 0 200 200");
const defsEl = ref<SVGDefsElement | null>(null);

const { getDefs } = useSvgFilters();

onMounted(async () => {
  const { d, viewBox: vb } = await useSvgPaths(props.svgName);
  paths.value = d;
  viewBox.value = vb;

  if (defsEl.value) {
    defsEl.value.innerHTML = getDefs([filter]);
  }
});
</script>
