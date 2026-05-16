"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Bar } from "./Bar";
import { PLACEHOLDERS } from "@/config";

type Props = {
  karma: number;
};

export const KarmaBar = ({ karma }: Props) => {
  const t = useTranslations("Modules");
  return (
    <Bar icon={<Heart className="text-primary h-5 w-5" />} tooltip={t(PLACEHOLDERS.TOOLTIP_KARMA)}>
      {karma}
    </Bar>
  );
};