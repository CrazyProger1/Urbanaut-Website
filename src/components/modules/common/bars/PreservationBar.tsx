"use client";

import React from "react";
import { Wrench } from "lucide-react";
import { useTranslations } from "next-intl";
import { Bar } from "./Bar";
import { PLACEHOLDERS } from "@/config";
import { PlacePreservation } from "@/types";
import { getPreservationColor } from "@/utils/classes";

type Props = {
  preservation: PlacePreservation;
};

export const PreservationBar = ({ preservation }: Props) => {
  const t = useTranslations("Modules");
  const label =
    preservation.level &&
    t(PLACEHOLDERS[`LABEL_PRESERVATION_${preservation.level}` as keyof typeof PLACEHOLDERS]);
  const tooltip =
    preservation.level &&
    t(PLACEHOLDERS[`DESCRIPTION_PRESERVATION_${preservation.level}` as keyof typeof PLACEHOLDERS]);

  return (
    <Bar
      color={getPreservationColor(preservation.level)}
      icon={<Wrench className="h-5 w-5" />}
      tooltip={tooltip || t(PLACEHOLDERS.LABEL_PRESERVATION)}
    >
      {label}
    </Bar>
  );
};