import React from "react";
import { User } from "@/types";
import { AchievementItem } from "./AchievementItem";

type Props = {
  user: User;
};

export const AchievementTable = ({ user }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-1">
      {user.achievements?.map((achievement) => (
        <AchievementItem key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
};
