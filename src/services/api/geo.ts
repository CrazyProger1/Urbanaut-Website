"use server";

import { APIListCity, APIPaginatedResponse } from "@/types";
import { fetchAuthenticated } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { APIListCountry } from "@/types/api";

export const getCountries = async (): Promise<APIPaginatedResponse<APIListCountry>> => {
  const params = new URLSearchParams();
  params.set("limit", "300");

  return fetchAuthenticated(`${API_ENDPOINTS.COUNTRIES}?${params}`);
};

export const getCities = async (): Promise<APIPaginatedResponse<APIListCity>> => {
  return fetchAuthenticated(API_ENDPOINTS.CITIES);
};
