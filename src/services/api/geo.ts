"use server";

import { APIPaginatedResponse } from "@/types";
import { fetchAuthenticated } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { APIListCountry } from "@/types/api";

export const getCountries = async (): Promise<APIPaginatedResponse<APIListCountry>> => {
  const params = new URLSearchParams();
  params.set("limit", "300");

  return fetchAuthenticated(`${API_ENDPOINTS.COUNTRIES}?${params}`);
};
