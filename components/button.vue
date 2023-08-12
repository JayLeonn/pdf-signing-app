<template>
  <button
    :class="buttonClasses"
    @click="onClick"
    :disabled="disabled"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: "bg-cyan-600",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  overrideStyle: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["click"]);

const onClick = () => emit("click");

const buttonClasses = computed(() => {
  const baseClasses =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border-0 font-medium antialiased text-white ring-inset ring-1 ring-black/10 px-6 py-3 text-base";

  let hoverColor = props.color.replace(/\b\d+\b/g, (match) => {
    return (parseInt(match) + 100).toString();
  });

  return `${baseClasses} ${props.color} hover:${hoverColor} active:${hoverColor} disabled:opacity-50 disabled:cursor-not-allowed ${props.overrideStyle}`;
});
</script>
