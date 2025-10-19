"use server";

import { fetchAPI } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { clearSession, getSession, setSession } from "@/utils/session";
import { APIMeUser, APITokens } from "@/types";

export const login = async (email: string, password: string): Promise<APIMeUser | undefined> => {
  const response = await fetchAPI<APITokens & { user: APIMeUser }>(API_ENDPOINTS.LOGIN, {
    body: JSON.stringify({ email, password }),
    method: "POST",
  });

  if (response.success) {
    await setSession({
      accessToken: response.access,
      refreshToken: response.refresh,
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

export const refresh = async () => {
  const session = await getSession();

  const response = await fetchAPI<{ access: string }>(API_ENDPOINTS.REFRESH, {
    body: JSON.stringify({ refresh: session?.refreshToken }),
    method: "POST",
  });

  if (response.success) {
    await setSession({ accessToken: response.access });
  }
};
