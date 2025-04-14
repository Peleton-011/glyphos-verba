<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="crystal" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="turbulence"
          baseFrequency="0.05"
          numOctaves="2"
          result="turbulence"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="turbulence"
          scale="10"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>

    <path
      :d="pathData"
      filter="url(#crystal)"
      :stroke="color"
      stroke-width="2"
      fill="none"
    />
  </svg>
</template>

<script setup>
defineProps({
  pathData: String,
  color: {
    type: String,
    default: "#ffffff",
  },
  size: {
    type: Number,
    default: 200,
  },
});
</script>
