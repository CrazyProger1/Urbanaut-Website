"use server";
import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import {
  APIArea,
  APIAreaFilters,
  ErrorAPIResponse,
  PaginatedAPIResponse,
  SuccessfulAPIResponse,
} from "@/types";

export const getAreas = async (
  filters?: APIAreaFilters,
): Promise<PaginatedAPIResponse<APIArea>> => {
  return fetchAuthenticated(API_ENDPOINTS.AREAS);
};

export const getArea = async (
  id: number | string,
): Promise<(SuccessfulAPIResponse & APIArea) | ErrorAPIResponse> => {
  return fetchAuthenticated(API_ENDPOINTS.AREA.replace("[id]", String(id)));
};
