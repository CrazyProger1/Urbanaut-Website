"use client";

import React from "react";
import { Achievement } from "@/types";
import { DynamicIcon } from "lucide-react/dynamic";
import { Bar } from "@/components/modules/common/bars";
import { getAchievementColor } from "@/utils/classes";
import { usePreservedParamsLink } from "@/hooks";
import { QUERIES } from "@/config";

type Props = {
  achievement: Achievement;
};

export const AchievementItem = ({ achievement }: Props) => {
  const href = usePreservedParamsLink({ [QUERIES.MODAL_ACHIEVEMENT]: achievement.slug });

  return (
    <Bar
      color={getAchievementColor(achievement?.significance)}
      icon={<DynamicIcon name={achievement.icon} className="h-5 w-5" />}
      href={href}
    >
      {achievement.name}
    </Bar>
  );
};