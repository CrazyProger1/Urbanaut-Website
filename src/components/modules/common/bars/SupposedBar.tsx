"use client";

import React from "react";
import { HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Bar } from "./Bar";
import { PAGES, PLACEHOLDERS, QUERIES } from "@/config";

export const SupposedBar = () => {
  const t = useTranslations("Modules");
  return (
    <Bar
      color="red"
      icon={<HelpCircle className="h-5 w-5" />}
      tooltip={t(PLACEHOLDERS.TOOLTIP_PLACE_SUPPOSED)}
      href={`${PAGES.MAP}?${QUERIES.MAP_FILTER_IS_SUPPOSED}=true`}
      className="lowercase"
    >
      {t(PLACEHOLDERS.LABEL_SUPPOSED)}
    </Bar>
  );
};