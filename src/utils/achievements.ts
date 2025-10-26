import { cn } from "@/lib/utils";
import { APIAchievementSignificance } from "@/types/api";

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
