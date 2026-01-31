import { fetchAuthenticated } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { APIListFile } from "@/types/services/api";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return await fetchAuthenticated<APIListFile>(API_ENDPOINTS.FILES, {
    method: "POST",
    body: formData,
  });
};
