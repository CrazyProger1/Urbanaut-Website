"use server";

import { APIListTag, APIPaginatedResponse } from "@/types";
import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";

export const getTags = async (): Promise<APIPaginatedResponse<APIListTag>> => {
  return fetchAuthenticated(API_ENDPOINTS.TAGS);
};
