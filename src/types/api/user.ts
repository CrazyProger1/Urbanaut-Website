import { Locale } from "@/i18n";
import { APIMetric } from "@/types/api/metric";
import { APIAchievement } from "@/types/api/achivement";

export type APITheme = "DARK" | "LIGHT";

export type APIRank = "ROOKIE" | "AMATEUR" | "PROFI" | "STALKER" | "LEGEND";

export type APISettings = {
  language?: Locale;
  theme?: APITheme;
  is_notifications_enabled?: boolean;
};

export type APIUser = {
  id: number;
  email?: string;
  metrics?: APIMetric[];
  achievements?: APIAchievement[];
  first_name?: string;
  last_name?: string;
  bio?: string;
  usernames?: string[];
  rank?: APIRank;
};

export type APIMeUser = APIUser & {
  email: string;
  settings: APISettings;
};
