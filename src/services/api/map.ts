"use server";

import { APIMapFilters } from "@/types";
import { buildURLSearchParams } from "@/utils/api";
import { fetchAuthenticated } from "@/services";
import { API_ENDPOINTS } from "@/config";

export const getMap = async (filters?: APIMapFilters) => {
  const params = buildURLSearchParams<APIMapFilters>(filters, ["area", "name", "tags"]);
  return fetchAuthenticated(`${API_ENDPOINTS.MAP}?${params}`);
};
