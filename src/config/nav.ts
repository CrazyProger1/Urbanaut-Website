import { Calendar, CircleDollarSign, Home, Map, Newspaper, Search, Send } from "lucide-react";
import { FaInstagram, FaPatreon, FaTelegram, FaTiktok, FaYoutube } from "react-icons/fa";
import { SidebarItem } from "@/types";
import { SidebarGroup } from "@/types/components/sidebar";
import { PLACEHOLDERS } from "@/config/i18n";

export const PAGES = {
  MAIN: "/",
  MAP: "/map",
  PROFILE: "/profile",
  BLOG: "/blog",
  CALENDAR: "/calendar",
  REFERRAL: "/r",
};

export const SITE_URL = process.env.SITE_URL || "https://urbanaut.club";

export const URLS = {
  SITE: SITE_URL,
  YOU_TUBE: "https://www.youtube.com/@UrbanautOfficial",
  INSTAGRAM: "https://www.instagram.com/urbanautofficial/",
  TELEGRAM: "https://t.me/urbanautofficial",
  TIKTOK: "https://www.tiktok.com/@urbanautofficial",
  PATREON: "https://www.patreon.com/urbanaut",
};

export const QUERIES = {
  MODAL_AREA_ADDING: "addarea",
  MODAL_PLACE_ADDING: "addplace",
  MODAL_FEEDBACK: "feedback",
  MODAL_EDIT_PROFILE: "edit",
  MODAL_REFERRAL_PROFILE: "referral",
  MODAL_SIGNIN: "signin",
  MODAL_SIGNUP: "signup",
  MODAL_MAP_FILTERS: "filters",
  MODAL_SETTINGS: "settings",
  MODAL_EDIT_PLACE: "edit",

  SHEET_AREA: "area",
  SHEET_PLACE: "place",

  OAUTH_SUCCESS: "oauth-success",
  OAUTH_USER: "oauth-user",

  FILTER_SELECTED_POINT: "point",
  FILTER_PRESERVATION_LEVEL: "preservation",
  FILTER_SECURITY_LEVEL: "security",
  FILTER_TAGS: "tags",
  FILTER_COUNTRY: "country",
  FILTER_CITY: "city",
  FILTER_IS_FAVORITE: "is_favorite",
  FILTER_IS_PRIVATE: "is_private",
  FILTER_IS_SUPPOSED: "is_supposed",
  FILTER_HAS_SECURITY: "has_security",

  VIEWER_PHOTO: "photo",
};

export const SIDEBAR_MAIN: SidebarItem[] = [
  {
    title: PLACEHOLDERS.BUTTON_HOME,
    url: PAGES.MAIN,
    icon: Home,
    disabled: true,
  },
  {
    title: PLACEHOLDERS.BUTTON_MAP,
    url: PAGES.MAP,
    icon: Map,
  },
  {
    title: PLACEHOLDERS.BUTTON_BLOG,
    url: PAGES.BLOG,
    icon: Newspaper,
    disabled: true,
  },
  {
    title: PLACEHOLDERS.BUTTON_CALENDAR,
    url: PAGES.CALENDAR,
    icon: Calendar,
    disabled: true,
  },
];
export const SIDEBAR_PLATFORMS: SidebarItem[] = [
  {
    title: PLACEHOLDERS.BUTTON_YOUTUBE,
    url: URLS.YOU_TUBE,
    icon: FaYoutube,
    target: "_blank",
  },
  {
    title: PLACEHOLDERS.BUTTON_INSTAGRAM,
    url: URLS.INSTAGRAM,
    icon: FaInstagram,
    target: "_blank",
  },
  {
    title: PLACEHOLDERS.BUTTON_TELEGRAM,
    url: URLS.TELEGRAM,
    icon: FaTelegram,
    target: "_blank",
  },
  {
    title: PLACEHOLDERS.BUTTON_TIKTOK,
    url: URLS.TIKTOK,
    icon: FaTiktok,
    target: "_blank",
  },
  {
    title: PLACEHOLDERS.BUTTON_PATREON,
    url: URLS.PATREON,
    icon: FaPatreon,
    target: "_blank",
  },
];
export const SIDEBAR_SUPPORT: SidebarItem[] = [
  {
    title: PLACEHOLDERS.BUTTON_DONATE,
    url: URLS.PATREON,
    icon: CircleDollarSign,
    target: "_blank",
  },
  {
    title: PLACEHOLDERS.BUTTON_FEEDBACK,
    url: `?${QUERIES.MODAL_FEEDBACK}=true`,
    icon: Send,
  },
];

export const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    items: SIDEBAR_MAIN,
  },
  {
    title: "Platforms",
    items: SIDEBAR_PLATFORMS,
  },
  {
    title: "Support Us",
    items: SIDEBAR_SUPPORT,
  },
];
