import createMiddleware from "next-intl/middleware";
import { jwtDecode } from "jwt-decode";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { getSession, setSession } from "@/utils/session";
import { APITokenPayload } from "@/types/services/api";
import { API_ENDPOINTS, REFRESH_DELTA_TIME } from "@/config";
import { fetchAPI } from "@/services";
import pino from "pino";
import { Locale } from "@/i18n";

const intlMiddleware = createMiddleware(routing);

const isLocale = (value: string): value is Locale =>
  (routing.locales as readonly string[]).includes(value);

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

  const preferredLanguage = session?.user?.settings?.language;

  if (preferredLanguage && isLocale(preferredLanguage)) {
    const [, firstSegment, ...rest] = request.nextUrl.pathname.split("/");
    if (isLocale(firstSegment) && firstSegment !== preferredLanguage) {
      const target = request.nextUrl.clone();
      target.pathname = `/${preferredLanguage}/${rest.join("/")}`.replace(/\/$/, "") || "/";
      return NextResponse.redirect(target);
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
