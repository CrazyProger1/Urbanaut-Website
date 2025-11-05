import { Calendar, CircleDollarSign, Home, Map, Newspaper, Search, Send } from "lucide-react";
import { FaInstagram, FaPatreon, FaTelegram, FaTiktok, FaYoutube } from "react-icons/fa";
import { SidebarItem } from "@/types";
import { SidebarGroup } from "@/types/ui";

export const PAGES = {
  MAIN: "/",
  MAP: "/map",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  BLOG: "/blog",
  CALENDAR: "/calendar",
};

export const QUERIES = {
  AREA_MODAL: "addarea",
  PLACE_MODAL: "addplace",
  AREA_SHEET: "area",
  PLACE_SHEET: "place",
};

export const SIDEBAR_MAIN: SidebarItem[] = [
  {
    title: "Home",
    url: PAGES.MAIN,
    icon: Home,
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
  },
  {
    title: "Calendar",
    url: PAGES.CALENDAR,
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
];
export const SIDEBAR_PLATFORMS: SidebarItem[] = [
  {
    title: "YouTube",
    url: "https://www.youtube.com/@UrbanautOfficial",
    icon: FaYoutube,
    target: "_blank",
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/urbanautofficial/",
    icon: FaInstagram,
    target: "_blank",
  },
  {
    title: "Telegram",
    url: "https://t.me/urbanautofficial",
    icon: FaTelegram,
    target: "_blank",
  },
  {
    title: "TikTok",
    url: "#",
    icon: FaTiktok,
    disabled: true,
    target: "_blank",
  },
  {
    title: "Patreon",
    url: "https://www.patreon.com/urbanaut",
    icon: FaPatreon,
    target: "_blank",
  },
];
export const SIDEBAR_SUPPORT: SidebarItem[] = [
  {
    title: "Donate",
    url: "https://www.patreon.com/c/urbanaut",
    icon: CircleDollarSign,
    target: "_blank",
  },
  {
    title: "Feedback",
    url: "#",
    icon: Send,
    disabled: true,
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
