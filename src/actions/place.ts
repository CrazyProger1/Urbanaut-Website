"use server";

import { APICreatePlace, APIPlaceFilters } from "@/types";
import * as services from "@/services";

export const createPlace = async (place: APICreatePlace) => {
  return await services.createPlace(place);
};

export const getPlaces = async (filters?: APIPlaceFilters) => {
  return await services.getPlaces(filters);
};
