import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import { APIArea, PaginatedAPIResponse } from "@/types";

export const getAreas = async (): Promise<PaginatedAPIResponse<APIArea>> => {
  return fetchAuthenticated(API_ENDPOINTS.AREAS);
};
