"use server";

import { APICreatePlace, APIPlaceFilters, APIUpdatePlace } from "@/types";
import * as services from "@/services";
import { convertAPIResponseToActionResult } from "@/utils/actions";
import { createRequest } from "@/services/api";
import { USER_REQUESTS } from "@/config";

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

export const editPlace = async (id: number | string, place: APIUpdatePlace) => {
  const response = await createRequest({
    context: { ...place, id, type: USER_REQUESTS.EDIT_PLACE },
  });
  return { ...convertAPIResponseToActionResult(response) };
};
