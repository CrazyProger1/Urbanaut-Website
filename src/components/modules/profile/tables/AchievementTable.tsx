import React from "react";
import { APICurrentUser } from "@/types";
import { AchievementItem } from "./AchievementItem";

type Props = {
  user: APICurrentUser;
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
