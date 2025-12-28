"use server";
import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import {
  APIListArea,
  APIRetrieveArea,
  APIAreaFilters,
  APICreateArea,
  ErrorAPIResponse,
  PaginatedAPIResponse,
  SuccessfulAPIResponse,
} from "@/types";

export const getAreas = async (
  filters?: APIAreaFilters,
): Promise<PaginatedAPIResponse<APIListArea>> => {
  return fetchAuthenticated(API_ENDPOINTS.AREAS);
};

export const getArea = async (
  id: number | string,
): Promise<(SuccessfulAPIResponse & APIRetrieveArea) | ErrorAPIResponse> => {
  return fetchAuthenticated(API_ENDPOINTS.AREA.replace("[id]", String(id)));
};

export const createArea = async (area: APICreateArea) => {
  return await fetchAuthenticated(API_ENDPOINTS.AREAS, {
    body: JSON.stringify(area),
    method: "POST",
  });
};
