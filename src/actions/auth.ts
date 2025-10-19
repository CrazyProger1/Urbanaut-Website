"use server";

import { fetchAPI } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { clearSession, setSession } from "@/utils/session";
import { APIMeUser, APITokens } from "@/types";

export const login = async (email: string, password: string): Promise<APIMeUser | undefined> => {
  const response = await fetchAPI<APITokens & { user: APIMeUser }>(API_ENDPOINTS.LOGIN, {
    body: JSON.stringify({ email, password }),
    method: "POST",
  });

  if (response.success) {
    await setSession({
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      user: response.user,
    });
    return response.user;
  }
};

export const register = async (email: string, password: string): Promise<boolean> => {
  const response = await fetchAPI<{ user: APIMeUser }>(API_ENDPOINTS.REGISTER, {
    body: JSON.stringify({ email, password }),
    method: "POST",
  });

  return response.success;
};

export const logout = async () => {
  await clearSession();
};