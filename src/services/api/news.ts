"use server";

import { fetchAuthenticated } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { APIListNews, APIPaginatedResponse } from "@/types";

export const getLatestNews = async () => {
  return fetchAuthenticated<APIPaginatedResponse<APIListNews>>(API_ENDPOINTS.NEWS);
};
