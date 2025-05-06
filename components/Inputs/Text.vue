<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  /** Current query string */
  modelValue: {
    type: String,
    default: "",
  },
  /** Placeholder or label for the textarea */
  placeholder: {
    type: String,
    default: "Ask your question…",
  },
  /** Label for the textarea */
  label: {
    type: String,
    default: "",
  },
  /** Number of rows for the textarea */
  rows: {
    type: Number,
    default: 3,
  },
  /** Maximum allowed length of the query */
  maxLength: {
    type: Number,
    default: 500,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// Unique ID for accessibility
const inputId = `query-${Math.random().toString(36).slice(2, 8)}`;

// Computed flag for length validation
const tooLong = computed(() => props.modelValue.length > props.maxLength);

// Handle input, enforcing maxLength
function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  let value = target.value;
  if (value.length > props.maxLength) {
    value = value.slice(0, props.maxLength);
  }
  emit("update:modelValue", value);
}
</script>

<template>
  <div>
    <label :for="inputId" class="block mb-1 font-medium">
      {{ label }}
    </label>
    <textarea
      :id="inputId"
      :rows="rows"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      class="border rounded px-3 py-2 w-full bg-transparent focus:outline-none"
    />
    <p v-if="tooLong" class="text-red-500 text-sm mt-1">
      Maximum length is {{ maxLength }} characters.
    </p>
  </div>
</template>
