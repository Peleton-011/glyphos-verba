<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: Number,
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 15,
  },
  text: {
    type: String,
    default: "Enter Amount",
  },
});

const inputId = `amount-${Math.random().toString(36).slice(2, 8)}`;

// Clamp input value to min/max
function clamp(value) {
  let num = Number(value);
  if (isNaN(num)) return props.min;
  if (num < props.min) return props.min;
  if (num > props.max) return props.max;
  return num;
}
</script>

<template>
  <div>
    <label :for="inputId" class="block mb-1 font-medium">
      {{ text }} ({{ min }}–{{ max }}):
    </label>
    <input
      :id="inputId"
      type="number"
      :value="modelValue"
      @input="$emit('update:modelValue', clamp($event.target.value))"
      :min="min"
      :max="max"
      class="border rounded px-3 py-2 w-full"
    />
    <p v-if="modelValue < min || modelValue > max" class="text-red-500 text-sm mt-1">
      Please enter a number between {{ min }} and {{ max }}.
    </p>
  </div>
</template>
