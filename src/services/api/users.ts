import {
  APICurrentUser,
  APIRetrieveUser,
  APIUpdateUser,
  APIErrorResponse,
  APISuccessfulResponse,
  APIUpdateSettings,
} from "@/types";
import { fetchAuthenticated } from "@/services";
import { API_ENDPOINTS } from "@/config";

export const updateUser = async (
  user: APIUpdateUser,
): Promise<(APISuccessfulResponse & APICurrentUser) | APIErrorResponse> => {
  return fetchAuthenticated(API_ENDPOINTS.USER.replace("[id]", "me"), {
    method: "PATCH",
    body: JSON.stringify(user),
  });
};

export const getUserByUsername = (
  username: string,
): Promise<(APISuccessfulResponse & APIRetrieveUser) | APIErrorResponse> => {
  return fetchAuthenticated(API_ENDPOINTS.USER_BY_USERNAME.replace("[username]", username));
};

export const updateSettings = (
  settings: APIUpdateSettings,
): Promise<(APISuccessfulResponse & APIRetrieveUser) | APIErrorResponse> => {
  return fetchAuthenticated(API_ENDPOINTS.SETTINGS, {
    method: "PATCH",
    body: JSON.stringify(settings),
  });
};
