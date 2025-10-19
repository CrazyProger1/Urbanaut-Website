"use server";

import { fetchAPI } from "@/services";
import { APICreatePlace } from "@/types";
import { API_ENDPOINTS } from "@/config";

export const createPlace = async (place: APICreatePlace) => {
  await fetchAPI(API_ENDPOINTS.PLACES, {
    body: JSON.stringify(place),
    method: "POST",
  });
};
