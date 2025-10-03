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

export { type APIUser } from "./user";
export type { GoogleOauthRedirectURIAPIResponse, GoogleOauthCallbackAPIResponse } from "./oauth";
