<template>
  <div class="relative inline-block group">
    <!-- Offset layer with gradient "cutout" effect -->
    <span class="button-offset-mask" />

    <!-- Button (transparent, clickable) -->
    <button
      class="relative z-10 px-6 py-3 font-bold text-white border-2 border-white bg-transparent rounded"
    >
      <slot />
    </button>
  </div>
</template>

<style scoped>
.button-offset-mask {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(to right, #8b5cf6, #ec4899);
  transform: translate(6px, 6px);
  border-radius: 0.375rem; /* match button's rounded-md */
  mask-image: linear-gradient(black, black);
  -webkit-mask-image: linear-gradient(black, black);

  /* Subtract the area of the button using masking */
  mask-composite: exclude;
  -webkit-mask-composite: destination-out;
}

.group:hover .button-offset-mask {
  background: linear-gradient(to right, #22d3ee, #6366f1); /* hover gradient */
}
</style>
