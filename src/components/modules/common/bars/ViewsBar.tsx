"use client";

import React from "react";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { Bar } from "./Bar";
import { PLACEHOLDERS } from "@/config";

type Props = {
  views: number;
};

export const ViewsBar = ({ views }: Props) => {
  const t = useTranslations("Modules");
  return (
    <Bar icon={<Eye className="text-primary h-5 w-5" />} tooltip={t(PLACEHOLDERS.TOOLTIP_VIEWS)}>
      {views}
    </Bar>
  );
};