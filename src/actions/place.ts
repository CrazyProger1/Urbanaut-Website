"use server";

import { APICreatePlace, APIPlaceFilters } from "@/types";
import * as services from "@/services";
import { convertAPIResponseToActionResult } from "@/utils/actions";

export const createPlace = async (place: APICreatePlace) => {
  const response = await services.createPlace(place);
  return convertAPIResponseToActionResult(response);
};

export const getPlaces = async (filters?: APIPlaceFilters) => {
  return await services.getPlaces(filters);
};

export const togglePlaceFavorite = async (id: number | string) => {
  const response = await services.togglePlaceFavorite(id);
  return { ...convertAPIResponseToActionResult(response), is_favorite: response.is_favorite };
};
