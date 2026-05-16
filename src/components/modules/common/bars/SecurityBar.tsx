"use client";

import React from "react";
import { ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { Bar } from "./Bar";
import { PAGES, PLACEHOLDERS, QUERIES } from "@/config";

export const SecurityBar = () => {
  const t = useTranslations("Modules");
  return (
    <Bar
      color="red"
      icon={<ShieldAlert className="h-5 w-5" />}
      tooltip={t(PLACEHOLDERS.TOOLTIP_PLACE_SECURITY)}
      href={`${PAGES.MAP}?${QUERIES.FILTER_HAS_SECURITY}=true`}
    >
      {t(PLACEHOLDERS.LABEL_HAS_SECURITY)}
    </Bar>
  );
};