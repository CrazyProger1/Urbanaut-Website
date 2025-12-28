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

export type {
  APICurrentUser,
  APIUpdateUser,
  APICreateUser,
  APIRetrieveSettings,
  APIUpdateSettings,
  APITheme,
  APIRank,
} from "./user";
export type { APIRetrieveMetric } from "./metric";
export type { APIRetrieveAchievement, APIAchievementSignificance } from "./achivement";
export type { APITokens, APIAccessToken, APITokenPayload } from "./token";
export type { GoogleOauthRedirectURIAPIResponse, GoogleOauthCallbackAPIResponse } from "./oauth";
export type { APIPoint } from "./geo";
export type { APIListPlace, APIRetrievePlace, APICreatePlace, APIPlaceFilters } from "./place";
export type { APIListArea, APIRetrieveArea, APICreateArea, APIAreaFilters } from "./area";
export type { APIListTag } from "./tag";
export type { APISecurityLevel } from "./security";
export type { APIPreservationLevel } from "./preservation";
export type { APICreateFeedback } from "./feedback";
