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
  TEAMS: "/teams",
  LEADERBOARD: "/leaderboard",
  NEWS: "/news",
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
  MODAL_CREATE_AREA: "create-area",
  MODAL_CREATE_PLACE: "create-place",
  MODAL_CREATE_FEEDBACK: "feedback",
  MODAL_EDIT_PROFILE: "edit-profile",
  MODAL_REFERRAL_PROFILE: "referral",
  MODAL_SIGNIN: "signin",
  MODAL_SIGNUP: "signup",
  MODAL_MAP_FILTERS: "filters",
  MODAL_SETTINGS: "settings",
  MODAL_EDIT_PLACE: "edit-place",
  MODAL_CREATE_COMPLAIN: "complain",
  MODAL_CREATE_EXPEDITION: "create-expedition",
  MODAL_CREATE_TEAM: "create-team",
  MODAL_ACHIEVEMENT: "achievement",
  MODAL_NOTIFICATION: "notification",

  AUTH_CODE: "auth_code",
  OAUTH_SUCCESS: "oauth-success",
  OAUTH_USER: "oauth-user",

  MAP_SHEET_AREA: "area",
  MAP_SHEET_PLACE: "place",
  MAP_FILTER_SELECTED_POINT: "point",
  MAP_FILTER_PRESERVATION_LEVEL: "preservation",
  MAP_FILTER_SECURITY_LEVEL: "security",
  MAP_FILTER_TAGS: "tags",
  MAP_FILTER_COUNTRY: "country",
  MAP_FILTER_CITY: "city",
  MAP_FILTER_IS_FAVORITE: "is_favorite",
  MAP_FILTER_IS_PRIVATE: "is_private",
  MAP_FILTER_IS_SUPPOSED: "is_supposed",
  MAP_FILTER_HAS_SECURITY: "has_security",
  MAP_VIEWER_PHOTO: "photo",
  MAP_SEARCH: "query",
  MAP_SEARCH_AI: "ai_query",

  PROFILE_TAB: "tab",
  PROFILE_SEARCH: "query",

  LEADERBOARD_TAB: "tab",
  LEADERBOARD_SEARCH: "query",
  LEADERBOARD_ORDERING: "ordering",
};

export const TABS = {
  PROFILE_FRIENDS: "friends",
  PROFILE_TEAMS: "teams",
  PROFILE_PLACES: "places",
  PROFILE_EXPEDITIONS: "expeditions",

  LEADERBOARD_USERS: "users",
  LEADERBOARD_TEAMS: "teams",
};

export const SIDEBAR_MAIN: SidebarItem[] = [
  {
    title: PLACEHOLDERS.BUTTON_HOME,
    url: PAGES.MAIN,
    icon: Home,
  },
  {
    title: PLACEHOLDERS.BUTTON_MAP,
    url: PAGES.MAP,
    icon: Map,
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
    url: `?${QUERIES.MODAL_CREATE_FEEDBACK}=true`,
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
