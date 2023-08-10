import {
  DocumentData,
  Documents,
  Signature,
  Document,
  Language,
} from "models/docueTypes";

const baseUrl = "/api";

const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = sessionStorage.getItem("apiToken");
  if (!token) {
    console.error("No token found");
    throw new Error("No token found");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error making request:", errorData);
    throw new Error(errorData.message || "Unknown error");
  }

  return response.json();
};

export const docueClient = {
  fetchDocuments: async (): Promise<Documents> => {
    return request("/documents");
  },

  uploadDocument: async (
    document: DocumentData,
    signatures: Signature[]
  ): Promise<Document> => {
    const formData = new FormData();
    formData.append("document[name]", document.name);
    formData.append(
      "document[creatorName]",
      document.creatorName ? document.creatorName : ""
    );
    formData.append("document[signingMethod]", document.signingMethod);
    formData.append("document[basePdf]", document.basePdf);
    formData.append("document[language]", document.language);
    signatures.forEach((signature, index) => {
      formData.append(`signatures[${index}][firstName]`, signature.firstName);
      formData.append(`signatures[${index}][lastName]`, signature.lastName);
      formData.append(`signatures[${index}][type]`, signature.type);
      if (signature.companyTitle)
        formData.append(
          `signatures[${index}][companyTitle]`,
          signature.companyTitle
        );
      if (signature.email)
        formData.append(`signatures[${index}][email]`, signature.email);
      if (signature.phone)
        formData.append(`signatures[${index}][phoneNumber]`, signature.phone);
    });

    const options: RequestInit = {
      method: "POST",
      body: formData,
    };

    return request<Document>("/documents", options);
  },

  finalizeDocument: async (documentId: string): Promise<Document> => {
    const options: RequestInit = {
      method: "POST",
    };
    return request<Document>(`/documents/${documentId}/finalize`, options);
  },

  sendSignatureInvitation: async (
    documentId: string,
    signatureId: string,
    language: Language
  ): Promise<{ status: { code: number } }> => {
    const formData = new FormData();
    formData.append("deliveryChannel", "email");
    formData.append("language", language);

    const options: RequestInit = {
      method: "POST",
      body: formData,
    };

    return request<{ status: { code: number } }>(
      `/documents/${documentId}/signatures/${signatureId}/invite`,
      options
    );
  },
};
