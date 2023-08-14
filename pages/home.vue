<template>
  <div class="h-screen">
    <div class="flex flex-col border-t border-gray-200 h-full">
      <div class="flex flex-1 flex-col md:flex-row">
        <FileDrop class="px-12 py-8 md:flex-1" />

        <DocumentsTable class="flex-1 p-0 border-l border-gray-200 md:px-12 md:py-8" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>

<style scoped></style>
