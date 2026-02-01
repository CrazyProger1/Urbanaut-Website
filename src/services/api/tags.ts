"use server";

import { APIListTag, APIPaginatedResponse } from "@/types";
import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";

export const getTags = async () => {
  return fetchAuthenticated<APIPaginatedResponse<APIListTag>>(API_ENDPOINTS.TAGS);
};
