"use server";

import {
  APICurrentUser,
  APIRetrieveUser,
  APIUpdateUser,
  APIErrorResponse,
  APISuccessfulResponse,
  APIUpdateSettings,
  APIObtainWebsocketToken,
} from "@/types";
import { fetchAuthenticated } from "@/services";
import { API_ENDPOINTS, CACHE_TAGS } from "@/config";

export const updateUser = async (
  user: APIUpdateUser,
): Promise<(APISuccessfulResponse & APICurrentUser) | APIErrorResponse> => {
  return await fetchAuthenticated(API_ENDPOINTS.USER.replace("[id]", "me"), {
    method: "PATCH",
    body: JSON.stringify(user),
  });
};

export const getUserByUsername = async (
  username: string,
): Promise<(APISuccessfulResponse & APIRetrieveUser) | APIErrorResponse> => {
  return await fetchAuthenticated(API_ENDPOINTS.USER_BY_USERNAME.replace("[username]", username));
};

export const updateSettings = async (
  settings: APIUpdateSettings,
): Promise<(APISuccessfulResponse & APIRetrieveUser) | APIErrorResponse> => {
  return await fetchAuthenticated(API_ENDPOINTS.SETTINGS, {
    method: "PATCH",
    body: JSON.stringify(settings),
  });
};

export const obtainWebsocketToken = async (): Promise<
  (APISuccessfulResponse & APIObtainWebsocketToken) | APIErrorResponse
> => {
  return await fetchAuthenticated(API_ENDPOINTS.WEBSOCKET_TOKENS, {
    method: "POST",
  });
};

export const getMe = async (): Promise<(APISuccessfulResponse & APICurrentUser) | APIErrorResponse> => {
  return await fetchAuthenticated(API_ENDPOINTS.USER.replace("[id]", "me"), {
    next: { tags: [CACHE_TAGS.CURRENT_USER] },
  });
};
