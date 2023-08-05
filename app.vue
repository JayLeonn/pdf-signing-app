<template>
  <div>
    <div class="flex flex-col justify-center mx-auto gap-5 w-1/2 p-8">
      <Input v-model="apiToken" :apiToken="apiToken">API Token</Input>
      <Button @click="storeToken" color="bg-red-500" :disabled="isTokenEmpty"
        >Save Token</Button
      >
      <Button @click="fetchDocuments" color="bg-blue-500" :disabled="isTokenEmpty">Fetch Docs</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from "./components/button.vue";
import Input from "./components/input.vue";

const apiToken = ref("");

const storeToken = () => {
  sessionStorage.setItem("apiToken", apiToken.value);
  console.log(apiToken.value, "Saved token!");
};

async function fetchDocuments() {
  const token = sessionStorage.getItem("apiToken");
  if (!token) {
    console.error("No token found");
    return;
  }

  const url = "/api/documents";
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    console.log(data.data); // Process the data as needed
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
}

onMounted(() => {
  const token = sessionStorage.getItem("apiToken");
  if (token) {
    apiToken.value = token;
  }
});

const isTokenEmpty = computed(() => apiToken.value.trim() === "");
</script>
