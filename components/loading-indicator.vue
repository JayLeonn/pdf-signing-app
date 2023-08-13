<template>
  <div
    class="fixed z-50 flex items-center justify-center inset-0 bg-opacity-50 bg-black"
  >
    <div
      class="h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
      role="status"
    >
      <span
        class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip"
        >Loading...</span
      >
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
