<template>
  <div>
    <ErrorBanner :message="errorMsg" v-if="errorMsg" @close="clearError" />
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import ErrorBanner from "./components/error-banner.vue";
const errorMsg = ref("");

onErrorCaptured((error) => {
  errorMsg.value = error.message;
  console.error(error);
  return false; // This prevents the error from propagating further
});

const clearError = () => {
  errorMsg.value = "";
};
</script>
