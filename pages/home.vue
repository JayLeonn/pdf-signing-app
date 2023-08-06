<template>
  <div class="p-8">
    <Button color="bg-blue-500">
      <NuxtLink to="/">Back</NuxtLink>
    </Button>

    <Button @click="fetchDocs()" color="bg-blue-500">Fetch Docs</Button>

    <pre>{{ JSON.stringify(docs, null, 2) }}</pre>
  </div>
</template>

<script setup>
import Button from "../components/button.vue";
import { docueClient } from "../clients/docue";

const docs = ref([]);

const fetchDocs = async () => {
  try {
    const response = await docueClient.fetchDocuments();
    docs.value = response.data;
    console.log(docs.value);
  } catch (e) {
    throw new Error(e.message);
  }
};

definePageMeta({
  middleware: "auth",
});
</script>

<style scoped></style>
