import { cookies } from "next/headers";
import { Session } from "@/types";
import { SESSION_COOKIE_NAME } from "@/config";

export const setSession = async (session: Session) => {
  const cookiesStore = await cookies();
  cookiesStore.set(SESSION_COOKIE_NAME, JSON.stringify(session));
};

export const getSession = async (): Promise<Session | undefined> => {
  const cookiesStore = await cookies();
  const sessionCookie = cookiesStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionCookie) {
    return JSON.parse(sessionCookie) as Session;
  }
};
