import { IconName } from "lucide-react/dynamic";

export type APIAchievement = {
  id: number;
  name: string;
  icon: IconName;
  weight?: number;
};
