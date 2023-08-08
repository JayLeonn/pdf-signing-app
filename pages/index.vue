<template>
  <div>
    <div class="flex flex-col justify-center mx-auto gap-5 w-1/2 p-8">
      <Input v-model="apiToken">Docue API Token</Input>
      <Button @click="storeToken" color="bg-red-500" :disabled="isTokenEmpty"
        >Use Token</Button
      >
    </div>
  </div>
</template>

<script setup>
const apiToken = ref("");

const storeToken = () => {
  sessionStorage.setItem("apiToken", apiToken.value);

  if (apiToken.value.trim()) {
    return navigateTo({
      path: "/home",
    });
  }
};

onMounted(() => {
  const token = sessionStorage.getItem("apiToken");
  if (token) {
    apiToken.value = token;
  }
});

const isTokenEmpty = computed(() => apiToken.value.trim() === "");
</script>

<style scoped></style>
