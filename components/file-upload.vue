<template>
  <ClientOnly
    ><h1 class="font-bold text-xl items-center">Upload document</h1>

    <div
      class="p-12 bg-gray-100 border border-dashed border-gray-300 rounded flex flex-col justify-content-center items-center"
      @dragover.prevent
      @drop="handleDrop"
    >
      <h5 class="m-0 text-center">Drag the file here</h5>
      <small class="font-bold uppercase mt-3 mb-3">or</small>
      <Button color="bg-gray-900" @click="handleBrowseClick">
        <font-awesome-icon icon="fa-folder-open"></font-awesome-icon> Browse
      </Button>
      <input
        type="file"
        ref="fileInput"
        accept=".pdf"
        @change="handleFileChange"
        style="display: none"
      />
    </div>

    <FileDialog
      v-if="dialogVisible"
      v-model:dialogVisible="dialogVisible"
      :fileData="fileData"
      :fileUrl="fileUrl"
    ></FileDialog>
  </ClientOnly>
</template>

<script setup>
const fileInput = ref(null);
const fileData = ref(null);
const fileUrl = ref(null);
const dialogVisible = ref(false);

const handleBrowseClick = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  fileData.value = selectedFile;
  const reader = new FileReader();
  reader.onload = (e) => {
    fileUrl.value = e.target.result;
  };
  reader.readAsDataURL(selectedFile);
  dialogVisible.value = true;

  event.target.value = null;
};

const handleDrop = (event) => {
  event.preventDefault();
  const selectedFile = event.dataTransfer.files[0];
  if (selectedFile && selectedFile.type === "application/pdf") {
    fileData.value = selectedFile;
    const reader = new FileReader();
    reader.onload = (e) => {
      fileUrl.value = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
    dialogVisible.value = true;
  }
  event.target.value = null;
};
</script>

<style scoped></style>
