<template>
  <div class="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
    <div
      class="relative flex bg-white mx-auto m-10 w-11/12 rounded-xl shadow-lg z-50 overflow-hidden"
    >
      <div class="flex grow bg-white">

        <div class="flex flex-col w-3/5">
          <h2
            class="relative flex items-center justify-center border border-gray-200 p-4 !m-0 w-full"
          >
            <button
              @click="closeDialog"
              class="flex items-center justify-center !rounded-full absolute left-4 top-3 text-gray-700 inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border-0 font-medium bg-transparent text-gray-800 hover:bg-gray-800/3 hover:no-underline active:bg-gray-800/6 p-0 text-base w-8 h-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="24px"
                height="24px"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <h2 class="font-semibold text-gray-800 mb-0 text-base">Sign document</h2>
          </h2>
          <div class="p-4">
            <Input v-model="documentName">Document Name</Input>
            <Button class="w-full my-4" color="bg-cyan-600" @click="uploadFile">Upload</Button>
          </div>
        </div>

        <iframe
          v-if="fileUrl"
          :src="fileUrl"
          width="100%"
        ></iframe>

      </div>
    </div>
    <div class="fixed inset-0 z-40 bg-black opacity-50" @click="closeDialog"></div>
  </div>
</template>

<script setup lang="ts">
import {
  Language,
  SigningMethod,
  Signature,
  SignatureType,
} from "../models/docueTypes";
import { docueClient } from "../clients/docue";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  fileData: {
    type: File,
    default: undefined,
  },
  fileUrl: {
    type: String,
    default: undefined,
  },
});

const documentName = ref(props.fileData?.name || "");

const emit = defineEmits(["update:dialogVisible"]);

const closeDialog = () => {
  console.log("close");
  emit("update:dialogVisible", false);
};

const uploadFile = async () => {
  if (props.fileData) {
    const documentData = {
      name: documentName.value,
      creatorName: "tech-task-nuxt3", //Hardcoded placeholder
      signingMethod: SigningMethod.Canvas,
      basePdf: props.fileData,
      language: Language.En,
    };

    const signatures: Signature[] = [
      {
        firstName: "placeholderName", // TODO: Replace with signature component data
        lastName: "placeholderLastName",
        type: SignatureType.Person,
      },
    ];

    console.log(documentData, signatures);

    try {
      const response = await docueClient.uploadDocument(
        documentData,
        signatures
      );
      console.log("Upload successful:", response);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }
};
</script>

<style scoped></style>
