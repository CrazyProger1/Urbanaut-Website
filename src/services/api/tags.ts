"use server";

import { APIListTag, PaginatedAPIResponse } from "@/types";
import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";

export const getTags = async (): Promise<PaginatedAPIResponse<APIListTag>> => {
  return fetchAuthenticated(API_ENDPOINTS.TAGS);
};
