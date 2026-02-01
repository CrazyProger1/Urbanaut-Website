import { Calendar, CircleDollarSign, Home, Map, Newspaper, Search, Send } from "lucide-react";
import { FaInstagram, FaPatreon, FaTelegram, FaTiktok, FaYoutube } from "react-icons/fa";
import { SidebarItem } from "@/types";
import { SidebarGroup } from "@/types/components/sidebar";

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
};

export const SIDEBAR_MAIN: SidebarItem[] = [
  {
    title: "Home",
    url: PAGES.MAIN,
    icon: Home,
    disabled: true,
  },
  {
    title: "Map",
    url: PAGES.MAP,
    icon: Map,
  },
  {
    title: "Blog",
    url: PAGES.BLOG,
    icon: Newspaper,
    disabled: true,
  },
  {
    title: "Calendar",
    url: PAGES.CALENDAR,
    icon: Calendar,
    disabled: true,
  },
];
export const SIDEBAR_PLATFORMS: SidebarItem[] = [
  {
    title: "YouTube",
    url: URLS.YOU_TUBE,
    icon: FaYoutube,
    target: "_blank",
  },
  {
    title: "Instagram",
    url: URLS.INSTAGRAM,
    icon: FaInstagram,
    target: "_blank",
  },
  {
    title: "Telegram",
    url: URLS.TELEGRAM,
    icon: FaTelegram,
    target: "_blank",
  },
  {
    title: "TikTok",
    url: URLS.TIKTOK,
    icon: FaTiktok,
    target: "_blank",
  },
  {
    title: "Patreon",
    url: URLS.PATREON,
    icon: FaPatreon,
    target: "_blank",
  },
];
export const SIDEBAR_SUPPORT: SidebarItem[] = [
  {
    title: "Donate",
    url: URLS.PATREON,
    icon: CircleDollarSign,
    target: "_blank",
  },
  {
    title: "Feedback",
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
