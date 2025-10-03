import { redirect } from "@/i18n";
import { getLocale } from "next-intl/server";
import { NextRequest } from "next/server";
import { fetchAPI } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { APIUser } from "@/types";
import { cookies } from "next/headers";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  const response = await fetchAPI<APIUser>(API_ENDPOINTS.GOOGLE_OAUTH_CALLBACK, {
    body: JSON.stringify({ state, code }),
    method: "POST",
  });

  const cookiesStore = await cookies();
  cookiesStore.set("user", JSON.stringify(response));

  const locale = await getLocale();
  redirect({ href: "/", locale: locale });
};
