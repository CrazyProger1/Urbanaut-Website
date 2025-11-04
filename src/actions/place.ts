"use client";

import { APICreatePlace } from "@/types";
import { API_ENDPOINTS } from "@/config";
import { fetchAuthenticated } from "@/services";

export const createPlace = async (place: APICreatePlace) => {
  await fetchAuthenticated(API_ENDPOINTS.PLACES, {
    body: JSON.stringify(place),
    method: "POST",
  });
};
