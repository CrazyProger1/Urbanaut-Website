import createMiddleware from "next-intl/middleware";
import { jwtDecode } from "jwt-decode";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";
import { getSession, setSession } from "@/utils/session";
import { APITokenPayload } from "@/types/services/api";
import { API_ENDPOINTS, REFRESH_DELTA_TIME } from "@/config";
import { fetchAPI } from "@/services";
import pino from "pino";

const intlMiddleware = createMiddleware(routing);

const logger = pino({
  base: {},
  level: process.env.NODE_ENV === "production" ? "info" : "silent",
});

const proxy = async (request: NextRequest) => {
  const start = Date.now();

  const session = await getSession();

  if (session && session.accessToken && session.refreshToken) {
    const decoded = jwtDecode<APITokenPayload>(session.accessToken);
    const exp = new Date(decoded.exp * 1000);
    const now = Date.now();

    const delta = exp.getTime() - now;

    if (delta <= REFRESH_DELTA_TIME) {
      const response = await fetchAPI<{ access: string }>(API_ENDPOINTS.REFRESH, {
        body: JSON.stringify({ refresh: session.refreshToken }),
        method: "POST",
      });

      if (!response.success) {
        return;
      }

      await setSession({ accessToken: response.access });
    }
  }

  const response = intlMiddleware(request);
  const duration = Date.now() - start;

  logger.info({
    method: request.method,
    user: session?.user?.id,
    url: request.url,
    status: response.status,
    duration,
  });

  return response;
};

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

export default proxy;
