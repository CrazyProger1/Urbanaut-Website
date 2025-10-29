"use server";

import { APITag, PaginatedAPIResponse } from "@/types";
import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";

export const getTags = async (): Promise<PaginatedAPIResponse<APITag>> => {
  return fetchAuthenticated(API_ENDPOINTS.TAGS);
};
