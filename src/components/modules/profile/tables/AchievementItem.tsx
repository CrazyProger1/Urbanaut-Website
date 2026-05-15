"use client";

import React from "react";
import { Achievement } from "@/types";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "lucide-react/dynamic";
import { getAchievementColorClass } from "@/utils/classes";
import { usePreservedParamsLink } from "@/hooks";
import { QUERIES } from "@/config";
import { Link } from "@/i18n";

type Props = {
  achievement: Achievement;
};

export const AchievementItem = ({ achievement }: Props) => {
  const colorClass = getAchievementColorClass(achievement?.significance);
  const href = usePreservedParamsLink({ [QUERIES.MODAL_ACHIEVEMENT]: achievement.slug });

  return (
    <Link href={href}>
      <Badge
        variant="outline"
        className={`flex flex-row items-center ${colorClass} cursor-pointer select-none`}
      >
        <DynamicIcon name={achievement.icon} />
        <div className="text-sm">{achievement.name}</div>
      </Badge>
    </Link>
  );
};