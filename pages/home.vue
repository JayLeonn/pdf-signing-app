<template>
  <div class="p-8">
    <Button color="bg-cyan-600">
      <NuxtLink to="/">Back</NuxtLink>
    </Button>

    <Button @click="fetchDocs()" color="bg-cyan-600">Fetch Docs</Button>

    <FileUpload />

    <h1>{{ docs ? docs.length : undefined }}</h1>
    <pre>{{ JSON.stringify(docs, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { docueClient } from "../clients/docue";

const docs = ref(undefined);

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
