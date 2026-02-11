import { defineRouting } from "next-intl/routing";

export type Locale = "en" | "uk" | "ru";

export const routing = defineRouting({
  locales: ["en", "uk", "ru"],
  defaultLocale: "en",
  localePrefix: "always",
});
