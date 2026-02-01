"use server";

import * as services from "@/services";
import { getMe } from "@/services";
import { clearSession, getSession, setSession } from "@/utils/session";
import { ActionResult, APICreateUser, CurrentUser } from "@/types";
import { convertAPIResponseToActionResult } from "@/utils/actions";

export const login = async (
  email: string,
  password: string,
): Promise<ActionResult & { user?: CurrentUser }> => {
  const response = await services.login(email, password);

  if (response.success) {
    await setSession({
      accessToken: response.access,
      refreshToken: response.refresh,
      user: response.user,
    });
    return {
      success: true,
      user: response.user,
    };
  }

  return { success: false };
};

export const register = async (user: APICreateUser): Promise<ActionResult> => {
  const response = await services.register(user);
  return convertAPIResponseToActionResult(response);
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
