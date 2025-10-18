import { redirect } from "@/i18n";
import { NextRequest } from "next/server";
import { fetchAPI } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { GoogleOauthCallbackAPIResponse } from "@/types";
import { setSession } from "@/utils/session";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get("state");
  const code = searchParams.get("code");


  const response = await fetchAPI<GoogleOauthCallbackAPIResponse>(
    API_ENDPOINTS.GOOGLE_OAUTH_CALLBACK,
    {
      body: JSON.stringify({ state, code }),
      method: "POST",
    },
  );

  const user = { ...response, success: undefined };

  await setSession({ user });

  redirect({ href: "/?oauth-success=true", locale: user?.settings?.language || "en" });
};
