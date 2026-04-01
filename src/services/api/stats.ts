"use server";

import { fetchAuthenticated } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { APIRetrieveGlobalStats } from "@/types";

export const getGlobalStats = async () => {
  return fetchAuthenticated<APIRetrieveGlobalStats>(API_ENDPOINTS.STATS);
};
