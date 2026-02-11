"use client";

import React from "react";
import { useTranslations, useFormatter } from "next-intl";
import { Hourglass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PLACEHOLDERS } from "@/config";

type Props = {
  builtAt?: Date;
  abandonedAt?: Date;
  createdAt?: Date;
};

export const TimelineSection = ({ builtAt, abandonedAt, createdAt }: Props) => {
  const t = useTranslations("Modules");
  const format = useFormatter();
  const formatDate = (date: Date) =>
    format.dateTime(date, { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <Hourglass />
        <div className="font-semibold">{t(PLACEHOLDERS.SECTION_TIMELINE)}</div>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        {builtAt && (
          <div className="flex cursor-pointer flex-row items-center gap-1">
            <p>{t(PLACEHOLDERS.LABEL_BUILT)}:</p> <Badge variant="tertiary">{formatDate(builtAt)}</Badge>
          </div>
        )}
        {abandonedAt && (
          <div className="flex cursor-pointer flex-row items-center gap-1">
            <p>{t(PLACEHOLDERS.LABEL_ABANDONED)}:</p> <Badge variant="tertiary">{formatDate(abandonedAt)}</Badge>
          </div>
        )}
        {createdAt && (
          <div className="flex cursor-pointer flex-row items-center gap-1">
            <p>{t(PLACEHOLDERS.LABEL_ADDED)}:</p> <Badge variant="tertiary">{formatDate(createdAt)}</Badge>
          </div>
        )}
      </div>
    </div>
  );
};
