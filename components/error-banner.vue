<template>
  <div
    v-if="show"
    class="bg-red-500 text-white px-4 py-2 rounded shadow-md relative mb-4"
  >
    <span>{{ message }}</span>
    <button @click="closeBanner" class="absolute top-1 right-5 text-xl">
      ×
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const { message = "An error has occurred!", showInitially = true } =
  defineProps(["message", "showInitially"]);

const emits = defineEmits(["close"]);

const show = ref(showInitially);

const closeBanner = () => {
  show.value = false;
  emits("close");
};
</script>

<style scoped></style>
