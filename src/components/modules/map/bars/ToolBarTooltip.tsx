"use client";

import React from "react";
import { CircleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { PLACEHOLDERS } from "@/config";

type Props = {
  tooltip: string;
};

export const ToolBarTooltip = ({ tooltip }: Props) => {
  const t = useTranslations("Modules");
  return (
    <div className="flex min-w-full flex-row gap-2 items-center first:border-t border-b p-1 border-white/20">
      <div>
        <CircleAlert />
      </div>
      <div className="flex max-w-fit flex-col items-center rounded-2xl text-sm">{t(tooltip)}</div>
    </div>
  );
};
