"use server";
import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import {
  APICreatePlace,
  APIListPlace,
  APIRetrievePlace,
  APIErrorResponse,
  APISuccessfulResponse,
  APIPaginatedResponse,
} from "@/types";
import { APIPlaceFilters } from "@/types/services/api";
import { buildURLSearchParams } from "@/utils/api";

export const getPlaces = async (
  filters?: APIPlaceFilters,
): Promise<APIPaginatedResponse<APIListPlace> | APIErrorResponse> => {
  const params = buildURLSearchParams<APIPlaceFilters>(filters, ["area", "name", "tags"]);
  return fetchAuthenticated(`${API_ENDPOINTS.PLACES}?${params}`);
};

export const getPlace = async (
  id: number | string,
): Promise<(APISuccessfulResponse & APIRetrievePlace) | APIErrorResponse> => {
  return fetchAuthenticated(API_ENDPOINTS.PLACE.replace("[id]", String(id)));
};

export const createPlace = async (
  place: APICreatePlace,
): Promise<(APISuccessfulResponse & APIRetrievePlace) | APIErrorResponse> => {
  return await fetchAuthenticated(API_ENDPOINTS.PLACES, {
    body: JSON.stringify(place),
    method: "POST",
  });
};

export const togglePlaceFavorite = async (id: string | number) => {
  return await fetchAuthenticated<{ is_favorite: boolean }>(
    API_ENDPOINTS.PLACE_TOGGLE_FAVORITE.replace("[id]", String(id)),
    {
      method: "PATCH",
    },
  );
};
