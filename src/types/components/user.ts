import {
  APIRetrieveUser,
  APICurrentUser,
  APIListUser,
  APITheme,
  APIRank,
  APIRetrieveMetric,
} from "@/types/services/api";

export type User = APIRetrieveUser;

export type CurrentUser = APICurrentUser;

export type UserCreator = APIListUser;

export type UserEditor = APIListUser;

export type UserTheme = APITheme;

export type UserRank = APIRank;

export type UserMetric = APIRetrieveMetric;
