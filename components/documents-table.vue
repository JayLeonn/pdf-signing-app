<template>
  <div>
    <div class="flex justify-between">
      <h1 class="font-bold text-xl items-center mb-4">Unsigned documents</h1>
      <font-awesome-icon
        @click="updateDocs()"
        icon="fa-rotate"
        class="text-l text-gray-900 rounded-full bg-gray-200 p-3 hover:bg-gray-300 hover:cursor-pointer"
      ></font-awesome-icon>
    </div>
    <table class="table-auto w-full">
      <tbody>
        <tr
          v-for="document in filteredDocuments"
          class="border-b border-gray-200"
        >
          <td class="p-4">
            <font-awesome-icon
              icon="fa-file"
              class="pr-2"
              :color="getColorByStage(document.stage)"
            ></font-awesome-icon
            >{{ document.name }}
          </td>
          <td class="p-4">{{ formatDate(document.createdAt) }}</td>
          <td class="p-4 text-right">
            <Button
              type="button"
              color="bg-gray-200"
              overrideStyle="px-3"
              v-if="document.signatures && document.signatures.length > 0"
              @click="sendSignatureInvitation(document)"
              ><font-awesome-icon
                icon="fa-bell"
                aria-hidden="true"
                color="black"
              ></font-awesome-icon
            ></Button>
          </td>
          <td
            class="text-right"
            v-if="
              document.signatures &&
              document.signatures.length > 0 &&
              document.signingMethod === SigningMethod.Canvas
            "
          >
            <span
              v-for="signature in document.signatures"
              class="bg-gray-200 ml-1 text-center p-2 rounded-full text-xs"
              :class="
                signature.state === State.Completed
                  ? 'bg-green-700 text-white'
                  : 'hover:cursor-pointer hover:bg-gray-300'
              "
              @click="signDocument(document, signature)"
            >
              {{ Array.from(signature.firstName)[0].toUpperCase()
              }}{{ Array.from(signature.lastName)[0].toUpperCase() }}
            </span>
          </td>
          <td
            class="text-right"
            v-else-if="
              document.signatures &&
              document.signatures.length > 0 &&
              document.signingMethod === SigningMethod.Strong
            "
          >
            <span
              v-for="signature in document.signatures"
              class="bg-red-500 ml-1 text-center p-2 rounded-full text-xs text-white"
              :class="
                signature.state === State.Completed
                  ? 'bg-green-700'
                  : 'hover:bg-red-600 hover:cursor-pointer hover:border-red-600'
              "
            >
              <a :href="signature.invitation?.url" target="_blank">
                {{ Array.from(signature.firstName)[0].toUpperCase()
                }}{{ Array.from(signature.lastName)[0].toUpperCase() }}
              </a>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <CanvasSigning
      v-if="dialogVisible"
      v-model:dialogVisible="dialogVisible"
      :signature="selectedSignature"
      :documentId="selectedDocument?.id"
    ></CanvasSigning>
  </div>
</template>

<script setup lang="ts">
import { ISO8601Date } from "models/utilTypes";
import {
  DocumentData,
  Language,
  Stage,
  SigningMethod,
  Signature,
  State,
} from "../models/docueTypes";
import { docueClient } from "../clients/docue";
import { documents, updateDocs } from "../shared/sharedState";

const dialogVisible = ref(false);
const selectedDocument = ref<DocumentData | undefined>(undefined);
const selectedSignature = ref<Signature | undefined>(undefined);
const filteredDocuments = computed(() => {
  return documents.value?.filter(
    (document) => document.stage !== Stage.Completed
  );
});

const sendSignatureInvitation = async (document: DocumentData) => {
  if (!document.signatures || !document.id) return;
  for (const signee of document.signatures) {
    if (!signee.id) return;
    try {
      await docueClient.sendSignatureInvitation(
        document.id,
        signee.id,
        Language.En
      );
    } catch (e) {
      throw new Error(`Unable to send ${signee.id} invitation`);
    }
  }
};

const formatDate = (date: ISO8601Date | undefined) => {
  if (!date) return;
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  return `${day}/${month}/${year}`;
};

const getColorByStage = (stage: Stage | undefined) => {
  if (!stage) return;
  switch (stage) {
    case Stage.Created:
      return "gray";
    case Stage.Finalized:
      return "orange";
    case Stage.Completed:
      return "green";
    default:
      return "gray";
  }
};

const signDocument = (document: DocumentData, signature: Signature) => {
  selectedDocument.value = document;
  selectedSignature.value = signature;
  dialogVisible.value = true;
};

onMounted(() => {
  updateDocs();
});
</script>

<style scoped></style>
