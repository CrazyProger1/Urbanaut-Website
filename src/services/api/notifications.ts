"use server";

import { APIErrorResponse, APIPaginatedResponse } from "@/types";
import { fetchAuthenticated } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { APIListNotification } from "@/types/services/api/user";

export const getNotifications = async (): Promise<
  APIPaginatedResponse<APIListNotification> | APIErrorResponse
> => {
  return fetchAuthenticated(`${API_ENDPOINTS.NOTIFICATIONS}?providers=WEBSITE`);
};
