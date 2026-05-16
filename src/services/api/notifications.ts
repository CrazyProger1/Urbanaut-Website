"use server";

import {
  APIErrorResponse,
  APIPaginatedResponse,
  APIListNotification,
  APIRetrieveNotification,
  APISuccessfulResponse,
} from "@/types";
import { fetchAuthenticated } from "@/services";
import { API_ENDPOINTS } from "@/config";

export const getNotifications = async (): Promise<
  APIPaginatedResponse<APIListNotification> | APIErrorResponse
> => {
  return fetchAuthenticated(`${API_ENDPOINTS.NOTIFICATIONS}?providers=WEBSITE`);
};

export const getNotification = async (
  id: number | string,
): Promise<(APIRetrieveNotification & APISuccessfulResponse) | APIErrorResponse> => {
  return fetchAuthenticated(API_ENDPOINTS.NOTIFICATION.replace("[id]", String(id)));
};
