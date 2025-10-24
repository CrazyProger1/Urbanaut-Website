import React from "react";
import { APIUser } from "@/types";
import { AchievementItem } from "./AchievementItem";
import { APIAchievement } from "@/types/api";

type Props = {
  user: APIUser;
};

export const AchievementTable = ({ user }: Props) => {
  return (
    <div className="flex flex-wrap gap-1">
      {user.achievements?.map((achievement) => (
        <AchievementItem key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
};
