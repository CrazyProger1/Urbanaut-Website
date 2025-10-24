import React from "react";
import { APIAchievement } from "@/types/api";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "lucide-react/dynamic";

type Props = {
  achievement: APIAchievement;
};

export const AchievementItem = ({ achievement }: Props) => {
  return (
    <Badge
      variant="outline"
      key={achievement.name}
      className={"flex flex-row items-center bg-purple-500/50"}
    >
      <DynamicIcon name={achievement.icon} />
      <div className="text-muted-foreground text-sm">{achievement.name}</div>
    </Badge>
  );
};
