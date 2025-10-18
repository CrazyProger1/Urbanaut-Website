import { Locale } from "@/i18n";


export type APITheme = "DARK" | "LIGHT";

export type APISettings = {
  language?: Locale;
  theme?: APITheme;
  is_notifications_enabled?: boolean;
};

export type APIUser = {
  id: number;
  email?: string;
};

export type APIMeUser = APIUser & {
  email: string;
  settings: APISettings;
};
