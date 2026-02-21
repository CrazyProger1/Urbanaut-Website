"use server";

import { APICreatePlace, APIPlaceFilters, APIUpdatePlace } from "@/types";
import * as services from "@/services";
import { convertAPIResponseToActionResult } from "@/utils/actions";
import { PAGES, QUERIES } from "@/config";
import { updatePlace } from "@/services/api";

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

export const editPlace = async (
  id: number | string,
  place: APIUpdatePlace,
  owner: boolean = false,
) => {
  let response;
  if (owner) {
    response = await updatePlace(id, place);
  } else {
    response = await services.createRequest({
      context: place,
      type: "CORRECTION",
      path: `${PAGES.MAP}?${QUERIES.SHEET_PLACE}=${id}&${QUERIES.MODAL_EDIT_PLACE}=true`,
    });
  }

  return convertAPIResponseToActionResult(response);
};
