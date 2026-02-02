import {
  APIRetrieveUser,
  APICurrentUser,
  APIListUser,
  APITheme,
  APIRank,
  APIRetrieveMetric,
  APIRetrieveNotification,
  APIListReferralCode,
} from "@/types/services/api";

export type User = APIRetrieveUser;

export type CurrentUser = APICurrentUser;

export type UserCreator = APIListUser;

export type UserEditor = APIListUser;

export type UserTheme = APITheme;

export type UserRank = APIRank;

export type UserMetric = APIRetrieveMetric;

export type Notification = APIRetrieveNotification;

export type ReferralCode = APIListReferralCode;
