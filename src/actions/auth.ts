"use server";

import * as services from "@/services";
import { clearSession, getSession, setSession } from "@/utils/session";
import { APICreateUser, APICurrentUser } from "@/types";
import { getMe } from "@/services";

export const login = async (
  email: string,
  password: string,
): Promise<APICurrentUser | undefined> => {
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

export const register = async (user: APICreateUser): Promise<boolean> => {
  const response = await services.register(user);
  return response.success;
};

export const logout = async () => {
  await clearSession();
};

export const syncCurrentUser = async () => {
  const session = await getSession();
  if (!session) return;
  const userResponse = await getMe();
  session.user = userResponse.success ? userResponse : undefined;
  await setSession(session);
};
