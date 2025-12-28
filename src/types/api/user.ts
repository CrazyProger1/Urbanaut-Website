import { Locale } from "@/i18n";
import { APIRetrieveMetric } from "@/types/api/metric";
import { APIRetrieveAchievement } from "@/types/api/achivement";

export type APITheme = "DARK" | "LIGHT";

export type APIRank = "ROOKIE" | "AMATEUR" | "PROFI" | "STALKER" | "LEGEND";

export type APIRetrieveSettings = {
  language: Locale;
  is_notifications_enabled: boolean;
  theme: APITheme;
};

export type APIUpdateSettings = {
  language?: Locale;
  is_notifications_enabled?: boolean;
  theme?: APITheme;
};

export type APICurrentUser = {
  id: string;
  email?: string;
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

export type APIUpdateUser = {
  email?: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
};

export type APICreateUser = {
  email?: string;
  password: string;
};
