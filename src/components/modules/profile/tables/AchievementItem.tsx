import React from "react";
import { Achievement } from "@/types";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "lucide-react/dynamic";
import { getAchievementColorClass } from "@/utils/css";

type Props = {
  achievement: Achievement;
};

export const AchievementItem = ({ achievement }: Props) => {
  const colorClass = getAchievementColorClass(achievement?.significance);
  return (
    <Badge
      variant="outline"
      key={achievement.name}
      className={`flex flex-row items-center ${colorClass} cursor-pointer select-none`}
    >
      <DynamicIcon name={achievement.icon} />
      <div className="text-sm">{achievement.name}</div>
    </Badge>
  );
};
