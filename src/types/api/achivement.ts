import { IconName } from "lucide-react/dynamic";

export type APIAchievementSignificance =
  | "INITIATION"
  | "GROWTH"
  | "MASTERY"
  | "VALOR"
  | "TRANSCENDENCE";

export type APIRetrieveAchievement = {
  id: number;
  name: string;
  weight: number;
  icon: IconName;
  significance: APIAchievementSignificance;
};
