<script lang="ts" setup>
const selectedAmount = ref(1);
const query = ref("");
</script>

<template>
  <div>
    <h1 class="section-title">Welcome to the Oracle</h1>

    <div class="flex justify-center">
      <form class="flex-col w-1/4" @submit.prevent>
        <InputsAmount
          v-model="selectedAmount"
          :min="1"
          :max="15"
          class="w-full mb-4"
          text="Cards to Draw"
        />

        <InputsText
          v-model="query"
          label="Ask your question…"
          placeholder="Consult the oracle"
          class="w-full mb-4"
        />

        <button
          class="btn-outline w-full"
          @click="
            $router.push({
              path: '/oracle/reading',
              query: {
                q: query || '',
                c: String(selectedAmount),
              },
            })
          "
        >
          Draw
        </button>
      </form>
    </div>
  </div>
</template>
