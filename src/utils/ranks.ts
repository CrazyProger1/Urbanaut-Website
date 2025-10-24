import { cn } from "@/lib/utils";
import { APIRank } from "@/types";

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
