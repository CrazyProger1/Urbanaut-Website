"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES } from "@/config";
import { Achievement } from "@/types";
import { DynamicIcon } from "lucide-react/dynamic";
import { KarmaBar, ExperienceBar, BalanceBar } from "@/components/modules/common/bars";
import { getAchievement } from "@/services/api/achievements";
import { getAchievementColorClass } from "@/utils/classes";

export const AchievementModal = () => {
  const searchParams = useSearchParams();
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [colorClass, setColorClass] = useState<string>();

  useEffect(() => {
    const slug = searchParams.get(QUERIES.MODAL_ACHIEVEMENT);

    if (slug) {
      getAchievement(slug).then((result) => {
        if (result.success) {
          setAchievement(result);
          setColorClass(getAchievementColorClass(result.significance));
        } else {
          setAchievement(null);
        }
      });
    } else {
      setAchievement(null);
    }
  }, [searchParams]);

  return (
    <Modal visible={!!achievement} query={QUERIES.MODAL_ACHIEVEMENT}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-sm">
        <div className={`${colorClass} flex items-center justify-center border-b-4 px-6 py-10`}>
          {achievement && <DynamicIcon name={achievement.icon} className="h-14 w-14" />}
        </div>
        <DialogHeader className="px-6 pt-4 pb-2">
          <DialogTitle className="text-center">{achievement?.name}</DialogTitle>
          <DialogDescription className="text-center">{achievement?.significance}</DialogDescription>
        </DialogHeader>
        {achievement?.description && (
          <p className="text-muted-foreground px-6 text-center text-sm leading-relaxed">
            {achievement.description}
          </p>
        )}
        {achievement && (
          <div className="flex justify-center gap-2 px-6 pb-6">
            <ExperienceBar experience={achievement.experience} />
            <KarmaBar karma={achievement.karma} />
            <BalanceBar balance={achievement.money} />
          </div>
        )}
      </DialogContent>
    </Modal>
  );
};
