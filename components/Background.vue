<script setup lang="ts">
function generateStars(n: number) {
  return Array.from({ length: n }, () => {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    return `${x}px ${y}px #FFF`;
  }).join(", ");
}

const starsSmall = generateStars(700);
const starsMedium = generateStars(200);
const starsBig = generateStars(100);
</script>

<template>
  <!-- Glow -->
  <div class="z-[-10] h-screen w-screen fixed bg-black l-0 t-0 overflow-hidden">
    <div class="absolute -inset-[100px] opacity-30">
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse"
      ></div>
      <div
        class="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse"
      ></div>
      <div
        class="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse"
      ></div>
    </div>
  </div>

  <!-- Stars -->
  <div class="z-[-5] fixed w-full h-screen overflow-hidden">
    <!-- bg-gradient-to-b from-[#1B2735] to-[#090A0F]" -->
    <div
      class="absolute w-[1px] h-[1px] bg-transparent animate-star"
      :style="{ boxShadow: starsSmall }"
    />
    <div
      class="absolute w-[2px] h-[2px] bg-transparent animate-star delay-100"
      :style="{ boxShadow: starsMedium }"
    />
    <div
      class="absolute w-[3px] h-[3px] bg-transparent animate-star delay-200"
      :style="{ boxShadow: starsBig }"
    />
  </div>
</template>
