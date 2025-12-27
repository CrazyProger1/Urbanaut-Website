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
  return cn(
    security === "NONE" && "bg-security-none border-security-none  text-foreground",
    security === "EASY" && "bg-security-easy border-security-easy  text-foreground",
    security === "MEDIUM" && "bg-security-medium border-security-medium  text-foreground",
    security === "HARD" && "bg-security-hard border-security-hard  text-foreground",
    security === "IMPOSSIBLE" &&
      "bg-security-impossible border-security-impossible  text-foreground",
    !security && "bg-security-none border-security-none  text-foreground",
  );
};

export const getPreservationColorClass = (preservation?: APIPreservationLevel) => {
  return cn(
    preservation === "NONE" && "bg-preservation-none border-preservation-none  text-foreground",
    preservation === "LOW" && "bg-preservation-low border-preservation-low  text-foreground",
    preservation === "MEDIUM" &&
      "bg-preservation-medium border-preservation-medium  text-foreground",
    preservation === "HIGH" && "bg-preservation-high border-preservation-high  text-foreground",
    preservation === "AWESOME" &&
      "bg-preservation-awesome border-preservation-awesome  text-foreground",
    !preservation && "bg-preservation-none border-preservation-none  text-foreground",
  );
};
