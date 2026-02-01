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
