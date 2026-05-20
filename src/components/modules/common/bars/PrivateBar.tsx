"use client";

import React from "react";
import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Bar } from "./Bar";
import { PAGES, PLACEHOLDERS, QUERIES } from "@/config";

export const PrivateBar = () => {
  const t = useTranslations("Modules");
  return (
    <Bar
      color="red"
      icon={<Lock className="h-5 w-5" />}
      tooltip={t(PLACEHOLDERS.TOOLTIP_PLACE_PRIVATE)}
      href={`${PAGES.MAP}?${QUERIES.MAP_FILTER_IS_PRIVATE}=true`}
      className="lowercase"
    >
      {t(PLACEHOLDERS.LABEL_PRIVATE)}
    </Bar>
  );
};