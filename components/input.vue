<template>
  <div class="relative flex flex-col antialiased">
    <input
      :value="modelValue"
      :required="required"
      @input="updateValue"
      type="text"
      class="w-full min-w-0 appearance-none rounded-lg border-transparent bg-transparent leading-snug ring-1 font-normal focus:border-transparent focus:ring-1 disabled:cursor-not-allowed text-gray-600 placeholder-gray-500 disabled:placeholder-gray-400 disabled:text-gray-400 disabled:bg-gray-50 ring-gray-200 focus:ring-gray-800 focus:ring-offset-gray-800 focus:placeholder-opacity-0 form-input pt-5 pb-1 md:pt-6 md:pb-2 py-3 md:py-4 invalid:!bg-white pr-2 md:pr-3 pl-2 md:pl-3 w-64"
    />
    <span
      aria-hidden="true"
      class="pr-2 rounded pointer-events-none absolute top-1 left-2 text-[11px] md:top-1.5 text-gray-500 md:left-3"
    >
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { Nullable } from "../models/utilTypes";

defineProps({
  modelValue: {
    type: String as () => Nullable<string>,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<style scoped></style>
