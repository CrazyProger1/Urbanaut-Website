"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { DateBar } from "@/components/modules/common/bars";
import { PLACEHOLDERS } from "@/config";

type Props = {
  builtAt?: Date;
  abandonedAt?: Date;
  createdAt?: Date;
};

export const TimelineSection = ({ builtAt, abandonedAt, createdAt }: Props) => {
  const t = useTranslations("Modules");

  const entries = [
    builtAt && { date: builtAt, label: t(PLACEHOLDERS.LABEL_BUILT) },
    abandonedAt && { date: abandonedAt, label: t(PLACEHOLDERS.LABEL_ABANDONED) },
    createdAt && { date: createdAt, label: t(PLACEHOLDERS.LABEL_ADDED) },
  ].filter(Boolean) as { date: Date; label: string }[];

  if (!entries.length) return null;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="font-semibold">{t(PLACEHOLDERS.SECTION_TIMELINE)}</div>
      <div className="flex flex-col items-center">
        {entries.map((entry, index) => (
          <div key={entry.label} className="flex w-fit flex-col items-center">
            <DateBar date={entry.date} label={entry.label} />
            {index < entries.length - 1 && (
              <ArrowDown className="text-muted-foreground size-4 my-0.5 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
