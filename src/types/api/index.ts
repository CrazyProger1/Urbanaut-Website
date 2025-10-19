export type APIResponse = {
  success: boolean;
};

export type SuccessfulAPIResponse = {
  success: true;
} & APIResponse;

export type ErrorAPIResponse = {
  success: false;
  message?: string;
} & APIResponse;

export type PaginatedAPIResponse<T> = {
  next?: string;
  previous?: string;
  count: number;
  results: T[];
} & SuccessfulAPIResponse;

export type { APIUser, APIMeUser } from "./user";
export { type APITokens } from "./token";
export type { GoogleOauthRedirectURIAPIResponse, GoogleOauthCallbackAPIResponse } from "./oauth";
export type { APIPoint } from "./geo";
export type { APIPlace } from "./place";