<script lang="ts" setup>
const selectedAmount = ref(1);
</script>

<template>
  <div>
    <h1 class="section-title">Welcome to the Oracle</h1>

    <div class="flex justify-center">
      <form class="flex-col w-1/4" @submit.prevent>
        <AmountInput
          v-model="selectedAmount"
          :min="1"
          :max="15"
          class="w-full mb-4"
          text="Cards to Draw"
        />

        <button
          class="btn-outline w-full"
          @click="$router.push(`/oracle/${selectedAmount}`)"
        >
          Draw
        </button>
      </form>
    </div>
  </div>
</template>
