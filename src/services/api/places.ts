"use server";
import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import { APICreatePlace, APIListPlace, APIRetrievePlace, ErrorAPIResponse, SuccessfulAPIResponse, PaginatedAPIResponse } from "@/types";
import { APIPlaceFilters } from "@/types/api";
import { buildURLSearchParams } from "@/utils/api";

export const getPlaces = async (
  filters?: APIPlaceFilters,
): Promise<PaginatedAPIResponse<APIListPlace> | ErrorAPIResponse> => {
  const params = buildURLSearchParams<APIPlaceFilters>(filters, ["area", "name", "tags"]);
  return fetchAuthenticated(`${API_ENDPOINTS.PLACES}?${params}`);
};

export const getPlace = async (
  id: number | string,
): Promise<(SuccessfulAPIResponse & APIRetrievePlace) | ErrorAPIResponse> => {
  return fetchAuthenticated(API_ENDPOINTS.PLACE.replace("[id]", String(id)));
};

export const createPlace = async (place: APICreatePlace) => {
  return await fetchAuthenticated(API_ENDPOINTS.PLACES, {
    body: JSON.stringify(place),
    method: "POST",
  });
};
