"use client";

import React from "react";
import { Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Bar } from "./Bar";
import { PLACEHOLDERS } from "@/config";

type Props = {
  experience: number;
};

export const ExperienceBar = ({ experience }: Props) => {
  const t = useTranslations("Modules");
  return (
    <Bar icon={<Zap className="text-primary h-5 w-5" />} tooltip={t(PLACEHOLDERS.TOOLTIP_EXPERIENCE)}>
      {experience}
    </Bar>
  );
};