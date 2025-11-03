import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import { APIArea, ErrorAPIResponse, PaginatedAPIResponse, SuccessfulAPIResponse } from "@/types";

export const getAreas = async (): Promise<PaginatedAPIResponse<APIArea>> => {
  return fetchAuthenticated(API_ENDPOINTS.AREAS);
};

export const getArea = async (
  id: number | string,
): Promise<(SuccessfulAPIResponse & APIArea) | ErrorAPIResponse> => {
  return fetchAuthenticated(API_ENDPOINTS.AREA.replace("[id]", String(id)));
};
