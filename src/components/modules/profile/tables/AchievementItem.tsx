import React from "react";
import { APIAchievement } from "@/types/api";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "lucide-react/dynamic";
import { getAchievementColorClass } from "@/utils/css";

type Props = {
  achievement: APIAchievement;
};

export const AchievementItem = ({ achievement }: Props) => {
  const colorClass = getAchievementColorClass(achievement?.significance);
  return (
    <Badge
      variant="outline"
      key={achievement.name}
      className={`flex flex-row items-center ${colorClass}`}
    >
      <DynamicIcon name={achievement.icon} />
      <div className="text-muted-foreground text-sm">{achievement.name}</div>
    </Badge>
  );
};
