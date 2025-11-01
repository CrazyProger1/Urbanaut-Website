import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import { APIPlace, ErrorAPIResponse, SuccessfulAPIResponse, PaginatedAPIResponse } from "@/types";

export const getPlaces = async (): Promise<PaginatedAPIResponse<APIPlace> | ErrorAPIResponse> => {
  return fetchAuthenticated(API_ENDPOINTS.PLACES);
};

export const getPlace = async (
  id: number | string,
): Promise<(SuccessfulAPIResponse & APIPlace) | ErrorAPIResponse> => {
  return fetchAuthenticated(API_ENDPOINTS.PLACE.replace("[id]", String(id)));
};
