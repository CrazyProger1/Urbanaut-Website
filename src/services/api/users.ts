import { APICurrentUser, APIUpdateUser, ErrorAPIResponse, SuccessfulAPIResponse } from "@/types";
import { fetchAuthenticated } from "@/services";
import { API_ENDPOINTS } from "@/config";

export const updateUser = async (
  user: APIUpdateUser,
): Promise<(SuccessfulAPIResponse & APICurrentUser) | ErrorAPIResponse> => {
  return fetchAuthenticated(API_ENDPOINTS.USER.replace("[id]", "me"), {
    method: "PATCH",
    body: JSON.stringify(user),
  });
};
