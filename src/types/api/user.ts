import { Locale } from "@/i18n";
import { APIRetrieveMetric } from "@/types/api/metric";
import { APIRetrieveAchievement } from "@/types/api/achivement";
import { APIRetrieveCountry } from "@/types/api/geo";

export type APITheme = "DARK" | "LIGHT";

export type APIRank = "ROOKIE" | "AMATEUR" | "PROFI" | "STALKER" | "LEGEND";

export type APIRetrieveCurrentUserSettings = {
  language: Locale;
  is_notifications_enabled: boolean;
  theme: APITheme;
  country?: APIRetrieveCountry;
};

export type APIRetrieveSettings = {
  language: Locale;
  country?: APIRetrieveCountry;
};

export type APIUpdateSettings = {
  language?: Locale;
  is_notifications_enabled?: boolean;
  theme?: APITheme;
};

export type APICurrentUser = {
  id: string;
  email?: string;
  settings: APIRetrieveCurrentUserSettings;
  usernames: string[];
  first_name?: string;
  last_name?: string;
  achievements: APIRetrieveAchievement[];
  metrics: APIRetrieveMetric[];
  bio?: string;
  created_at: string;
  rank?: APIRank;
};

export type APIRetrieveUser = {
  id: string;
  settings: APIRetrieveSettings;
  usernames: string[];
  first_name?: string;
  last_name?: string;
  achievements: APIRetrieveAchievement[];
  metrics: APIRetrieveMetric[];
  bio?: string;
  created_at: string;
  rank?: APIRank;
};

export type APIListUser = {
  id: string;
  usernames: string[];
  first_name?: string;
  last_name?: string;
  rank?: APIRank;
};

export type APIUpdateUser = {
  email?: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
};

export type APICreateUser = {
  email?: string;
  password: string;
  code?: string;
  country?: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  born_at?: string;
};
