import {
  BaseColor,
  getBadgeClass,
  getCardClass,
  getIconClass,
  getShadowClass,
} from "@/utils/colors";
import {
  APIRank,
  APIAchievementSignificance,
  APISecurityLevel,
  APIPreservationLevel,
} from "@/types";

export type ToastType = "success" | "error" | "warning" | "info" | "default";

export const getNotificationColor = (type: string): BaseColor => {
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

export const getAchievementColor = (significance?: APIAchievementSignificance): BaseColor => {
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

export const getSecurityColor = (security?: APISecurityLevel): BaseColor => {
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

export const getPreservationColor = (preservation?: APIPreservationLevel): BaseColor => {
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

export const getRankColor = (rank?: APIRank): BaseColor => {
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

export const getToastColor = (type: ToastType): BaseColor => {
  switch (type) {
    case "success":
      return "green";
    case "error":
      return "red";
    case "warning":
      return "yellow";
    case "info":
      return "blue";
    case "default":
    default:
      return "white";
  }
};

export const getNotificationColorClass = (type: string) => getCardClass(getNotificationColor(type));

export const getNotificationIconColorClass = (type: string) =>
  getIconClass(getNotificationColor(type));

export const getAchievementColorClass = (significance?: APIAchievementSignificance) =>
  getCardClass(getAchievementColor(significance));

export const getSecurityColorClass = (security?: APISecurityLevel) =>
  getBadgeClass(getSecurityColor(security));

export const getPreservationColorClass = (preservation?: APIPreservationLevel) =>
  getBadgeClass(getPreservationColor(preservation));

export const getRankShadowClass = (rank?: APIRank) => getShadowClass(getRankColor(rank));

export const getToastColorClass = (type: ToastType) => getCardClass(getToastColor(type));

export const getToastIconColorClass = (type: ToastType) => getIconClass(getToastColor(type));
