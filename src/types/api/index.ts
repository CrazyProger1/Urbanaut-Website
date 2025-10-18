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

export { type APIUser, type APIMeUser } from "./user";
export { type APITokens } from "./tokens";
export type { GoogleOauthRedirectURIAPIResponse, GoogleOauthCallbackAPIResponse } from "./oauth";
