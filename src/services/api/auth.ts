import { getSession } from "@/utils/session";
import { fetchAPI } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { APICreateUser, APICurrentUser, APITokens, APIGoogleOauthRedirectURIResponse } from "@/types";

export const fetchAuthenticated = async <T>(endpoint: string, options?: RequestInit) => {
  const session = await getSession();
  return await fetchAPI<T>(endpoint, {
    accessToken: session?.accessToken,
    ...options,
  });
};

export const login = async (email: string, password: string) => {
  return await fetchAPI<APITokens & { user: APICurrentUser }>(API_ENDPOINTS.LOGIN, {
    body: JSON.stringify({ email, password }),
    method: "POST",
  });
};

export const register = async (user: APICreateUser) => {
  return await fetchAPI<{ user: APICurrentUser }>(API_ENDPOINTS.REGISTER, {
    body: JSON.stringify(user),
    method: "POST",
  });
};

export const getGoogleOAuthRedirectUri = async () => {
  return await fetchAuthenticated<APIGoogleOauthRedirectURIResponse>(
    API_ENDPOINTS.GOOGLE_OAUTH_REDIRECT_URI,
  );
};
