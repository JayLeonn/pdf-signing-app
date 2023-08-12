import { ref } from 'vue';
import { DocumentData } from "../models/docueTypes"; // Adjust path as needed
import { docueClient } from "../clients/docue"; // Adjust path as needed

// Reactive property to hold the documents
export const documents = ref<DocumentData[] | undefined>(undefined);

// Method to fetch the documents
export const updateDocs = async () => {
  try {
    const response = await docueClient.fetchDocuments();
    documents.value = response.data;
  } catch (e) {
    throw new Error("Failed to fetch documents");
  }
};