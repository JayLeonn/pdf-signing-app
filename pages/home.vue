<template>
  <div class="h-screen">
    <div class="flex flex-col border-t border-gray-200 h-full">

      <div class="flex flex-1">
        <FileDrop class="flex-1 px-12 py-8" />

        <DocumentsTable class="flex-1 px-12 py-8 border-l border-gray-200" />
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
