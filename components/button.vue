<template>
  <button :class="buttonClasses" @click="onClick" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const onClick = () => emit("click");

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border-0 font-medium antialiased text-white ring-inset ring-1 ring-black/10 px-6 py-3 text-base';
  const hoverColor = props.color.replace('500', '700');
  return `${baseClasses} ${props.color} hover:${hoverColor} active:${hoverColor} disabled:opacity-50 disabled:cursor-not-allowed`;
});

</script>
