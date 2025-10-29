export type APIResponse = {
  success: boolean;
};

export type SuccessfulAPIResponse = {
  success: true;
} & APIResponse;

export type APIError = {
  code?: string;
  detail?: string;
  attr?: string;
};

export type ErrorAPIResponse = {
  success: false;
  message?: string;
  errors: APIError[];
} & APIResponse;

export type PaginatedAPIResponse<T> = {
  next?: string;
  previous?: string;
  count: number;
  results: T[];
} & SuccessfulAPIResponse;

export type { APIUser, APIMeUser, APIRank } from "./user";
export type { APIMetric } from "./metric";
export type { APIAchievement, APIAchievementSignificance } from "./achivement";
export type { APITokens, APIAccessToken, APITokenPayload } from "./token";
export type { GoogleOauthRedirectURIAPIResponse, GoogleOauthCallbackAPIResponse } from "./oauth";
export type { APIPoint } from "./geo";
export type { APIPlace, APICreatePlace } from "./place";
export type { APIArea, APICreateArea } from "./area";
export type { APITag } from "./tag";
