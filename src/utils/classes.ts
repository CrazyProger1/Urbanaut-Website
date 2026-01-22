import { cn } from "@/lib/utils";
import {
  APIRank,
  APIAchievementSignificance,
  APISecurityLevel,
  APIPreservationLevel,
} from "@/types";

export const getRankShadowClass = (rank?: APIRank) => {
  return cn(
    rank === "ROOKIE" && "drop-shadow-rank-rookie",
    rank === "AMATEUR" && "drop-shadow-rank-amateur",
    rank === "PROFI" && "drop-shadow-rank-profi",
    rank === "STALKER" && "drop-shadow-rank-stalker",
    rank === "LEGEND" && "drop-shadow-rank-legend",
    !rank && "drop-shadow-rank-rookie",
  );
};

export const getAchievementColorClass = (significance?: APIAchievementSignificance) => {
  return cn(
    significance === "INITIATION" && "bg-achievement-initiation border-achievement-initiation",
    significance === "GROWTH" && "bg-achievement-growth border-achievement-growth",
    significance === "MASTERY" && "bg-achievement-mastery border-achievement-mastery",
    significance === "VALOR" && "bg-achievement-valor border-achievement-valor",
    significance === "TRANSCENDENCE" &&
      "bg-achievement-transcendence border-achievement-transcendence",
    !significance && "bg-achievement-initiation border-achievement-initiation",
  );
};

export const getSecurityColorClass = (security?: APISecurityLevel) => {
  switch (security) {
    case "NONE":
      return "bg-security-none border-security-none text-foreground hover:bg-security-none-hover dark:bg-security-none dark:hover:bg-security-none-hover";
    case "EASY":
      return "bg-security-easy border-security-easy text-foreground hover:bg-security-easy-hover dark:bg-security-easy dark:hover:bg-security-easy-hover";
    case "MEDIUM":
      return "bg-security-medium border-security-medium text-foreground hover:bg-security-medium-hover dark:bg-security-medium dark:hover:bg-security-medium-hover";
    case "HARD":
      return "bg-security-hard border-security-hard text-foreground hover:bg-security-hard-hover dark:bg-security-hard dark:hover:bg-security-hard-hover";
    case "IMPOSSIBLE":
      return "bg-security-impossible border-security-impossible text-foreground hover:bg-security-impossible-hover dark:bg-security-impossible dark:hover:bg-security-impossible-hover";
    default:
      return "bg-security-none border-security-none text-foreground hover:bg-security-none-hover dark:bg-security-none dark:hover:bg-security-none-hover";
  }
};
export const getPreservationColorClass = (preservation?: APIPreservationLevel) => {
  switch (preservation) {
    case "NONE":
      return "bg-preservation-none border-preservation-none text-foreground hover:bg-preservation-none-hover dark:bg-preservation-none dark:hover:bg-preservation-none-hover";
    case "LOW":
      return "bg-preservation-low border-preservation-low text-foreground hover:bg-preservation-low-hover dark:bg-preservation-low dark:hover:bg-preservation-low-hover";
    case "MEDIUM":
      return "bg-preservation-medium border-preservation-medium text-foreground hover:bg-preservation-medium-hover dark:bg-preservation-medium dark:hover:bg-preservation-medium-hover";
    case "HIGH":
      return "bg-preservation-high border-preservation-high text-foreground hover:bg-preservation-high-hover dark:bg-preservation-high dark:hover:bg-preservation-high-hover";
    case "AWESOME":
      return "bg-preservation-awesome border-preservation-awesome text-foreground hover:bg-preservation-awesome-hover dark:bg-preservation-awesome dark:hover:bg-preservation-awesome-hover";
    default:
      return "bg-preservation-none border-preservation-none text-foreground hover:bg-preservation-none-hover dark:bg-preservation-none dark:hover:bg-preservation-none-hover";
  }
};

export const getNotificationColorClass = (type: string) => {
  switch (type) {
    case "UPDATE":
      return "bg-notification-update-bg! border-notification-update-border!";
    case "SUCCESS":
      return "bg-notification-success-bg! border-notification-success-border!";
    case "REMINDER":
      return "bg-notification-reminder-bg! border-notification-reminder-border!";
    case "SYSTEM":
      return "bg-notification-system-bg! border-notification-system-border!";
    case "SOCIAL":
      return "bg-notification-social-bg! border-notification-social-border!";
    case "ALERT":
      return "bg-notification-alert-bg! border-notification-alert-border!";
    default:
      return "bg-notification-default-bg! border-notification-default-border!";
  }
};

export const getNotificationIconColorClass = (type: string) => {
  switch (type) {
    case "UPDATE":
      return "text-notification-update-icon";
    case "SUCCESS":
      return "text-notification-success-icon";
    case "REMINDER":
      return "text-notification-reminder-icon";
    case "SYSTEM":
      return "text-notification-system-icon";
    case "SOCIAL":
      return "text-notification-social-icon";
    case "ALERT":
      return "text-notification-alert-icon";
    default:
      return "text-notification-default-icon";
  }
};

