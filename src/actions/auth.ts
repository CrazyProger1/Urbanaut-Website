"use server";

import { fetchAPI } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { setSession } from "@/utils/session";
import { APITokens } from "@/types/api";

export const login = async (username: string, password: string) => {
  const response = await fetchAPI<APITokens>(API_ENDPOINTS.LOGIN, {
    body: JSON.stringify({ username, password }),
    method: "POST",
  });

  console.log(response);

  if (response.success) {
    await setSession({ accessToken: response.access_token, refreshToken: response.refresh_token });
  }
};
