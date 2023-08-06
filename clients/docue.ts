import { Documents } from "models/docueTypes";

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
};
