export const API_URL = process.env.API_URL!;
export const PROXY_URL = process.env.PROXY_URL!;
export const API_ENDPOINTS = {
  GOOGLE_OAUTH_CALLBACK: "google/oauth/callback/",
  GOOGLE_OAUTH_REDIRECT_URI: "google/oauth/uri/",
  REGISTER: "users/",
  LOGIN: "tokens/",
  PLACES: "places/",
  PLACE: "places/[id]",
  AREAS: "areas/",
  AREA: "areas/[id]",
  REFRESH: "tokens/refresh/",
  TAGS: "tags/",
};
