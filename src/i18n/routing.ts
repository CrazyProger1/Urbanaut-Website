import { defineRouting } from "next-intl/routing";

export type Locale = "en" | "uk";

export const routing = defineRouting({
  locales: ["en", "uk"],
  defaultLocale: "en",
  localePrefix: "always",
});
