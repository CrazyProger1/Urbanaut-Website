import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import { APIPlace, ErrorAPIResponse, SuccessfulAPIResponse, PaginatedAPIResponse } from "@/types";
import { APIPlaceFilters } from "@/types/api";
import { builtURLSearchParams } from "@/utils/api";

export const getPlaces = async (
  filters?: APIPlaceFilters,
): Promise<PaginatedAPIResponse<APIPlace> | ErrorAPIResponse> => {
  const params = builtURLSearchParams<APIPlaceFilters>(filters, ["area", "name", "tags"]);
  return fetchAuthenticated(`${API_ENDPOINTS.PLACES}?${params}`);
};

export const getPlace = async (
  id: number | string,
): Promise<(SuccessfulAPIResponse & APIPlace) | ErrorAPIResponse> => {
  return fetchAuthenticated(API_ENDPOINTS.PLACE.replace("[id]", String(id)));
};
