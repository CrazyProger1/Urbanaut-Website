import type { Metadata, Viewport } from "next";
import { getTranslations } from "next-intl/server";
import { PLACEHOLDERS, SITE_URL } from "@/config";
import { routing } from "@/i18n/routing";

const SITE_NAME = "Urbanaut-Club";
const DEFAULT_OG_IMAGE = {
  url: "/web-app-manifest-512x512.png",
  width: 512,
  height: 512,
  alt: SITE_NAME,
};

const HREFLANG: Record<string, string> = {
  en: "en-US",
  ru: "ru-RU",
  uk: "uk-UA",
};

const OG_LOCALES: Record<string, string> = {
  en: "en_US",
  ru: "ru_RU",
  uk: "uk_UA",
};

const KEYWORDS = [
  "urbex",
  "urban",
  "urbanaut",
  "club",
  "urbanaut club",
  "exploration",
  "diggers",
  "stalkers",
  "urban exploration",
  "urbex community",
  "abandoned places",
  "urban explorers",
  "extreme tourism",
  "underground exploration",
  "urban adventure",
  "industrial ruins",
  "rooftopping",
  "drainspotting",
  "infiltration",
  "abandoned buildings",
  "lost places",
  "bunkers",
  "tunnels",
  "expeditions",
  "урбекс",
  "урбан",
  "урбанавт",
  "городские исследователи",
  "заброшки",
  "заброшенные места",
  "диггеры",
  "сталкеры",
  "руферы",
  "бункеры",
  "тоннели",
  "экстремальный туризм",
  "экспедиции",
  "міські дослідники",
  "покинуті місця",
  "діґери",
  "сталкери",
  "руфери",
  "бункери",
  "тунелі",
  "екстремальний туризм",
  "експедиції",
  "мдд",
  "мдр",
  "мдс",
];

const localePath = (locale: string, path = "/") => {
  const cleanPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return locale === routing.defaultLocale ? cleanPath || "/" : `/${locale}${cleanPath}`;
};

const buildLanguageAlternates = (path = "/") => {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[HREFLANG[locale] ?? locale] = localePath(locale, path);
  }
  languages["x-default"] = localePath(routing.defaultLocale, path);
  return languages;
};

export type BuildMetadataOptions = {
  locale: string;
  title?: string;
  description?: string;
  path?: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  noIndex?: boolean;
  extraKeywords?: string[];
};

export const buildMetadata = async ({
  locale,
  title,
  description,
  path = "/",
  image,
  noIndex,
  extraKeywords,
}: BuildMetadataOptions): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: "Modules" });
  const resolvedTitle = title ?? t(PLACEHOLDERS.META_TITLE);
  const resolvedDescription = description ?? t(PLACEHOLDERS.META_DESCRIPTION);
  const canonical = localePath(locale, path);
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: resolvedTitle,
      template: `%s - ${SITE_NAME}`,
    },
    description: resolvedDescription,
    keywords: extraKeywords ? [...KEYWORDS, ...extraKeywords] : KEYWORDS,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "social",
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      title: resolvedTitle,
      description: resolvedDescription,
      locale: OG_LOCALES[locale] ?? OG_LOCALES.en,
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALES[l] ?? l),
      images: [ogImage],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      title: SITE_NAME,
      statusBarStyle: "black-translucent",
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
};

export const buildRootMetadata = (locale: string) => buildMetadata({ locale });

export const rootViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark light",
};