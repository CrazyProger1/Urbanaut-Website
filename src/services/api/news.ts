"use server";

import { fetchAuthenticated } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { APIListNews, APIPaginatedResponse } from "@/types";
import { APINewsFilters } from "@/types";
import { buildURLSearchParams } from "@/utils/api";

type GetLatestNewsOptions = APINewsFilters;

export const getNews = async (options?: GetLatestNewsOptions) => {
  const params = buildURLSearchParams<APINewsFilters>(options, ["limit", "offset", "ordering"]);
  return fetchAuthenticated<APIPaginatedResponse<APIListNews>>(`${API_ENDPOINTS.NEWS}?${params}`);
};
