"use server";

import * as services from "@/services";
import { clearSession, setSession } from "@/utils/session";
import { APICurrentUser } from "@/types";

export const login = async (email: string, password: string): Promise<APICurrentUser | undefined> => {
  const response = await services.login(email, password);

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
  const response = await services.register(email, password);
  return response.success;
};

export const logout = async () => {
  await clearSession();
};
