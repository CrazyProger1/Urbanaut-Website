import { IconName } from "lucide-react/dynamic";

export type APIAchievementSignificance =
  | "INITIATION"
  | "GROWTH"
  | "MASTERY"
  | "VALOR"
  | "TRANSCENDENCE";

export type APIAchievement = {
  id: number;
  name: string;
  icon: IconName;
  weight?: number;
  significance?: APIAchievementSignificance;
};
