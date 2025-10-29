import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import { APIPlace, PaginatedAPIResponse } from "@/types";

export const getPlaces = async (): Promise<PaginatedAPIResponse<APIPlace>> => {
  return fetchAuthenticated(API_ENDPOINTS.PLACES);
};
