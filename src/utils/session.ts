"use server";

import { cookies } from "next/headers";
import { Session } from "@/types";
import { SESSION_OPTIONS } from "@/config";
import { getIronSession } from "iron-session";

export const setSession = async (session: Session) => {
  const currentSession = await getIronSession<Session>(await cookies(), SESSION_OPTIONS);
  currentSession.user = session.user || currentSession.user;
  currentSession.accessToken = session.accessToken || currentSession.accessToken;
  currentSession.refreshToken = session.refreshToken || currentSession.refreshToken;
  await currentSession.save();
  console.log(`Session updated: ${JSON.stringify(currentSession.user)}`);
  return currentSession;
};

export const getSession = async (): Promise<Session | undefined> => {
  const session = await getIronSession<Session>(await cookies(), SESSION_OPTIONS);

  if (session) {
    return session;
  }
};
