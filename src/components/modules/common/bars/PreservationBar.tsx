"use client";

import React from "react";
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

  return (
    <Bar color={getPreservationColor(preservation.level)} tooltip={t(PLACEHOLDERS.LABEL_PRESERVATION)}>
      {label}
    </Bar>
  );
};