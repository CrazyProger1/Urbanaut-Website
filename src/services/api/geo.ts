"use server";

import { APIListCity, APIPaginatedResponse } from "@/types";
import { fetchAuthenticated } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { APIListCountry } from "@/types/services/api";

export const getCountries = async () => {
  const params = new URLSearchParams();
  params.set("limit", "300");

  return fetchAuthenticated<APIPaginatedResponse<APIListCountry>>(
    `${API_ENDPOINTS.COUNTRIES}?${params}`,
  );
};

export const getCities = async () => {
  return fetchAuthenticated<APIPaginatedResponse<APIListCountry>>(API_ENDPOINTS.CITIES);
};
