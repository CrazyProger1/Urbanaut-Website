"use server";

import { APICreateArea, APIAreaFilters } from "@/types";
import * as services from "@/services";

export const createArea = async (area: APICreateArea) => {
  return await services.createArea(area);
};

export const getAreas = async (filters?: APIAreaFilters) => {
  return await services.getAreas(filters);
};
