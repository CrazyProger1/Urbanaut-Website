"use server";

import { cookies } from "next/headers";
import { APITokenPayload, Session } from "@/types";
import { REFRESH_DELTA_TIME, SESSION_OPTIONS } from "@/config";
import { getIronSession } from "iron-session";
import { jwtDecode } from "jwt-decode";

export const isValidSession = async (session: Session) => {
  if (!session.accessToken) {
    return false;
  }
  const decoded = jwtDecode<APITokenPayload>(session.accessToken);
  const exp = new Date(decoded.exp * 1000);
  const now = Date.now();

  const delta = exp.getTime() - now;

  return delta > 0;
};

export const setSession = async (session: Session) => {
  const currentSession = await getIronSession<Session>(await cookies(), SESSION_OPTIONS);
  currentSession.user = session.user || currentSession.user;
  currentSession.accessToken = session.accessToken || currentSession.accessToken;
  currentSession.refreshToken = session.refreshToken || currentSession.refreshToken;
  currentSession.websocketToken = session.websocketToken || currentSession.websocketToken;
  await currentSession.save();
  return currentSession;
};

export const getSession = async (): Promise<Session | undefined> => {
  const session = await getIronSession<Session>(await cookies(), SESSION_OPTIONS);

  if (session && (await isValidSession(session))) {
    return session;
  }
};

export const clearSession = async () => {
  const session = await getIronSession<Session>(await cookies(), SESSION_OPTIONS);
  session.destroy();
};
