"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Tooltip } from "@/components/ui/next/tooltip";
import { PLACEHOLDERS } from "@/config";
import { PlacePreservation } from "@/types";
import { getPreservationColorClass } from "@/utils/classes";

type Props = {
  preservation: PlacePreservation;
};

export const PreservationBar = ({ preservation }: Props) => {
  const t = useTranslations("Modules");
  const colorClass = getPreservationColorClass(preservation.level);
  const label =
    preservation.level &&
    t(PLACEHOLDERS[`LABEL_PRESERVATION_${preservation.level}` as keyof typeof PLACEHOLDERS]);

  return (
    <Tooltip content={t(PLACEHOLDERS.LABEL_PRESERVATION)} asChild>
      <Button variant="ghost" className={`${colorClass} h-9 transition-colors`} asChild>
        <div className="flex items-center rounded-md px-2 text-sm font-medium select-none">
          {label}
        </div>
      </Button>
    </Tooltip>
  );
};
