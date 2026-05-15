"use server";

import { fetchAuthenticated } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { APIRetrieveAchievement, APISuccessfulResponse, APIErrorResponse } from "@/types";

export const getAchievement = async (
  slug: string,
): Promise<(APISuccessfulResponse & APIRetrieveAchievement) | APIErrorResponse> => {
  return fetchAuthenticated<APISuccessfulResponse & APIRetrieveAchievement>(
    API_ENDPOINTS.ACHIEVEMENT.replace("[slug]", slug),
  );
};