<template>
  <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg
      class="absolute inset-0"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        :d="pathData"
        :stroke="color"
        stroke-width="2"
        fill="none"
        class="drop-shadow"
      />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  pathData: String,
  color: {
    type: String,
    default: "#333",
  },
  size: {
    type: Number,
    default: 200,
  },
});
</script>

<style scoped>
.drop-shadow {
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))
    drop-shadow(-2px -2px 4px rgba(255, 255, 255, 0.5));
}
</style>
