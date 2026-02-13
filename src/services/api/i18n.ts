import { fetchAuthenticated } from "@/services";
import { APIListLanguage, APIPaginatedResponse } from "@/types";
import { API_ENDPOINTS } from "@/config";

export const getLanguages = async () => {
  return fetchAuthenticated<APIPaginatedResponse<APIListLanguage>>(API_ENDPOINTS.LANGUAGES);
};