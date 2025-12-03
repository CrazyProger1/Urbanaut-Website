"use server";

import { APICreateArea } from "@/types";
import { API_ENDPOINTS } from "@/config";
import * as services from "@/services";
import { APIAreaFilters } from "@/types";

export const createArea = async (area: APICreateArea) => {
  await services.fetchAuthenticated(API_ENDPOINTS.AREAS, {
    body: JSON.stringify(area),
    method: "POST",
  });
};

export const getAreas = async (filters?: APIAreaFilters) => {
  return await services.getAreas(filters);
};
