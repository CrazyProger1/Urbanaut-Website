"use server";
import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import {
  APIListArea,
  APIRetrieveArea,
  APIAreaFilters,
  APICreateArea,
  APIErrorResponse,
  APIPaginatedResponse,
  APISuccessfulResponse,
} from "@/types";

export const getAreas = async (
  filters?: APIAreaFilters,
): Promise<APIPaginatedResponse<APIListArea>> => {
  return fetchAuthenticated(API_ENDPOINTS.AREAS);
};

export const getArea = async (
  id: number | string,
): Promise<(APISuccessfulResponse & APIRetrieveArea) | APIErrorResponse> => {
  return fetchAuthenticated(API_ENDPOINTS.AREA.replace("[id]", String(id)));
};

export const createArea = async (area: APICreateArea) => {
  return await fetchAuthenticated(API_ENDPOINTS.AREAS, {
    body: JSON.stringify(area),
    method: "POST",
  });
};
