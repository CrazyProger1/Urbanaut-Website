"use server";

import { APICreatePlace } from "@/types";
import { API_ENDPOINTS } from "@/config";
import * as services from "@/services";
import { APIPlaceFilters } from "@/types";

export const createPlace = async (place: APICreatePlace) => {
  await services.fetchAuthenticated(API_ENDPOINTS.PLACES, {
    body: JSON.stringify(place),
    method: "POST",
  });
};

export const getPlaces = async (filters?: APIPlaceFilters) => {
  return await services.getPlaces(filters);
};
