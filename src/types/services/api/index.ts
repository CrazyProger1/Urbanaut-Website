export type APIResponse = {
  success: boolean;
};

export type APISuccessfulResponse = {
  success: true;
} & APIResponse;

export type APIError = {
  code?: string;
  detail?: string;
  attr?: string;
};

export type APIErrorResponse = {
  success: false;
  message?: string;
  errors: APIError[];
} & APIResponse;

export type APIPaginatedResponse<T> = {
  next?: string;
  previous?: string;
  count: number;
  results: T[];
} & APISuccessfulResponse;

export type {
  APICurrentUser,
  APIUpdateUser,
  APIRetrieveUser,
  APICreateUser,
  APIRetrieveSettings,
  APIUpdateSettings,
  APIRetrieveCurrentUserSettings,
  APITheme,
  APIRank,
  APIListUser,
  APIRetrieveNotification,
} from "./user";
export type { APIRetrieveMetric } from "./metric";
export type { APIRetrieveAchievement, APIAchievementSignificance } from "./achivement";
export type { APITokens, APIAccessToken, APITokenPayload, APIObtainWebsocketToken } from "./token";
export type { APIGoogleOauthRedirectURIResponse, APIGoogleOauthCallbackResponse } from "./oauth";
export type { APIPoint, APIListCountry, APIListCity, APIRetrieveCountry } from "./geo";
export type {
  APIListPlace,
  APIRetrievePlace,
  APICreatePlace,
  APIPlaceFilters,
  APIListPlaceFile,
  APIPlaceCreateSecurity,
  APIPlaceRetrievePreservation,
  APIPlaceRetrieveSecurity,
  APIPlaceCreatePreservation,
  APIUpdatePlace,
} from "./place";
export type { APIListArea, APIRetrieveArea, APICreateArea, APIAreaFilters } from "./area";
export type { APIListTag } from "./tag";
export type { APIMapBounds } from "./map";
export type { APISecurityLevel } from "./security";
export type { APIPreservationLevel } from "./preservation";
export type { APICreateFeedback, APICreateRequest } from "./feedback";
export type { APIListReferralCode } from "./referrals";
export type { APIListFile, APIFileType } from "./media";
export type { APIListLanguage } from "./i18n";
