import {
  APIRank,
  APIAchievementSignificance,
  APISecurityLevel,
  APIPreservationLevel,
} from "@/types";

export type Color = "red" | "green" | "yellow" | "blue" | "purple" | "white";

const CARD_CLASSES: Record<Color, string> = {
  red: "bg-red-bg! border-red-border! hover:bg-red-hover!",
  green: "bg-green-bg! border-green-border! hover:bg-green-hover!",
  yellow: "bg-yellow-bg! border-yellow-border! hover:bg-yellow-hover!",
  blue: "bg-blue-bg! border-blue-border! hover:bg-blue-hover!",
  purple: "bg-purple-bg! border-purple-border! hover:bg-purple-hover!",
  white: "bg-white-bg! border-white-border! hover:bg-white-hover!",
};

const BADGE_CLASSES: Record<Color, string> = {
  red: "bg-red-solid! border-red-border! text-foreground hover:bg-red-solid-hover!",
  green: "bg-green-solid! border-green-border! text-foreground hover:bg-green-solid-hover!",
  yellow: "bg-yellow-solid! border-yellow-border! text-foreground hover:bg-yellow-solid-hover!",
  blue: "bg-blue-solid! border-blue-border! text-foreground hover:bg-blue-solid-hover!",
  purple: "bg-purple-solid! border-purple-border! text-foreground hover:bg-purple-solid-hover!",
  white: "bg-white-solid! border-white-border! text-foreground hover:bg-white-solid-hover!",
};

const ICON_CLASSES: Record<Color, string> = {
  red: "text-red-icon",
  green: "text-green-icon",
  yellow: "text-yellow-icon",
  blue: "text-blue-icon",
  purple: "text-purple-icon",
  white: "text-white-icon",
};

const SHADOW_CLASSES: Record<Color, string> = {
  red: "drop-shadow-red-shadow",
  green: "drop-shadow-green-shadow",
  yellow: "drop-shadow-yellow-shadow",
  blue: "drop-shadow-blue-shadow",
  purple: "drop-shadow-purple-shadow",
  white: "drop-shadow-white-shadow",
};

const getNotificationColor = (type: string): Color => {
  switch (type) {
    case "UPDATE":
      return "blue";
    case "SUCCESS":
      return "green";
    case "REMINDER":
      return "purple";
    case "SYSTEM":
      return "white";
    case "SOCIAL":
      return "yellow";
    case "ALERT":
      return "red";
    default:
      return "yellow";
  }
};

const getAchievementColor = (significance?: APIAchievementSignificance): Color => {
  switch (significance) {
    case "GROWTH":
      return "green";
    case "MASTERY":
      return "yellow";
    case "VALOR":
      return "red";
    case "TRANSCENDENCE":
      return "purple";
    case "INITIATION":
    default:
      return "white";
  }
};

const getSecurityColor = (security?: APISecurityLevel): Color => {
  switch (security) {
    case "EASY":
      return "green";
    case "MEDIUM":
      return "yellow";
    case "HARD":
      return "red";
    case "IMPOSSIBLE":
      return "purple";
    case "NONE":
    default:
      return "white";
  }
};

const getPreservationColor = (preservation?: APIPreservationLevel): Color => {
  switch (preservation) {
    case "LOW":
      return "red";
    case "MEDIUM":
      return "yellow";
    case "HIGH":
      return "green";
    case "AWESOME":
      return "purple";
    case "NONE":
    default:
      return "white";
  }
};

const getRankColor = (rank?: APIRank): Color => {
  switch (rank) {
    case "AMATEUR":
      return "green";
    case "PROFI":
      return "yellow";
    case "STALKER":
      return "red";
    case "LEGEND":
      return "purple";
    case "ROOKIE":
    default:
      return "white";
  }
};

export const getRankShadowClass = (rank?: APIRank) => SHADOW_CLASSES[getRankColor(rank)];

export const getAchievementColorClass = (significance?: APIAchievementSignificance) =>
  CARD_CLASSES[getAchievementColor(significance)];

export const getSecurityColorClass = (security?: APISecurityLevel) =>
  BADGE_CLASSES[getSecurityColor(security)];

export const getPreservationColorClass = (preservation?: APIPreservationLevel) =>
  BADGE_CLASSES[getPreservationColor(preservation)];

export const getNotificationColorClass = (type: string) => CARD_CLASSES[getNotificationColor(type)];

export const getNotificationIconColorClass = (type: string) => ICON_CLASSES[getNotificationColor(type)];
