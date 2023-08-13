<template>
  <div class="fixed inset-0 z-40 overflow-auto bg-smoke-light flex">
    <div
      class="relative flex bg-white mx-auto m-10 w-11/12 rounded-xl shadow-lg z-40 overflow-hidden"
    >
      <div class="flex grow bg-white">
        <div class="flex flex-col w-3/5">
          <h2
            class="relative flex items-center justify-center border border-gray-200 p-4 !m-0 w-full"
          >
            <button
              @click="closeDialog"
              class="flex items-center justify-center !rounded-full absolute left-4 top-3 text-gray-700 inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border-0 font-medium bg-transparent text-gray-800 hover:bg-gray-800/3 hover:no-underline p-0 text-base w-8 h-8"
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
            <h2 class="font-semibold text-gray-800 mb-0 text-base">
              Sign document
            </h2>
          </h2>
          <div class="p-5 h-full relative flex flex-col gap-8 overflow-auto">
            <Input v-model="documentName" required>Document Name*</Input>
            <SigningType v-model="selectedMethod" />
            <AddSignee v-model="signees" />
          </div>
          <div class="p-5 border-t border-gray-200">
            <Button class="w-full" @click="uploadFile" :disabled="!isFormValid"
              >Send File</Button
            >
          </div>
        </div>

        <iframe v-if="fileUrl" :src="fileUrl" width="100%"></iframe>
      </div>
    </div>
    <div
      class="fixed inset-0 z-30 bg-black opacity-50"
      @click="closeDialog"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {
  Language,
  Signature,
  SignatureType,
  SigningMethod,
} from "../models/docueTypes";
import { docueClient } from "../clients/docue";
import { updateDocs } from "../shared/sharedState";

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
const signees = ref<Signature[]>([]);
const selectedMethod = ref<SigningMethod>(SigningMethod.Canvas);

const isFormValid = computed((): boolean => {
  if (documentName.value.trim() === "") return false;
  if (signees.value.length === 0) return false;

  for (const signee of signees.value) {
    if (!signee.firstName || !signee.lastName || !signee.email) {
      return false;
    }
  }

  return true;
});

const uploadFile = async () => {
  if (props.fileData) {
    const documentData = {
      name: documentName.value,
      creatorName: "tech-task-nuxt3", // Placeholder
      basePdf: props.fileData,
      language: Language.En,
      signingMethod: selectedMethod.value,
    };
    const signatures: Signature[] = signees.value.map((signee) => ({
      firstName: signee.firstName,
      lastName: signee.lastName,
      type: SignatureType.Person,
      email: signee.email,
    }));

    try {
      //start document upload process
      const response = await docueClient.uploadDocument(
        documentData,
        signatures
      );
      //send document finalize request
      if (response.data && response.data.id) {
        const finalized = await docueClient.finalizeDocument(response.data.id);
        if (finalized.data && finalized.data.signatures) {
          //send signing invitations
          for (const signature of finalized.data.signatures) {
            if (signature.id) {
              await docueClient.sendSignatureInvitation(
                response.data.id,
                signature.id,
                Language.En
              );
            }
          }
        }
      }
      updateDocs();
      closeDialog();
    } catch (error) {
      throw new Error("Error uploading document");
    }
  }
};

const emit = defineEmits(["update:dialogVisible"]);

const closeDialog = () => {
  emit("update:dialogVisible", false);
};
</script>

<style scoped></style>
