import { ref } from "vue";
import { DocumentData } from "../models/docueTypes";
import { docueClient } from "../clients/docue";

export const documents = ref<DocumentData[] | undefined>(undefined);
export const isLoading = ref(false);

export const updateDocs = async () => {
  try {
    const response = await docueClient.fetchDocuments();
    documents.value = response.data;
  } catch (e) {
    throw new Error("Failed to fetch documents");
  }
};
