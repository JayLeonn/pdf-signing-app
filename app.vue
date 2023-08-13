<template>
  <LoadingIndicator v-if="isLoading" />
  <ErrorBanner :message="errorMsg" v-if="errorMsg" @close="clearError" />
  <NuxtPage />
</template>
<script setup lang="ts">
import ErrorBanner from "./components/error-banner.vue";
import { isLoading } from "./shared/sharedState";
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
