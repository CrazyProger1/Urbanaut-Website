"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Bar } from "./Bar";
import { CopyToast } from "@/components/common/toasts";
import { PLACEHOLDERS } from "@/config";
import { Point } from "@/types";

type Props = {
  point: Point;
};

export const CoordinatesBar = ({ point }: Props) => {
  const t = useTranslations("Modules");

  return (
    <CopyToast clipboard={`${point[0]}, ${point[1]}`}>
      <Bar
        icon={<MapPin className="text-primary h-5 w-5" />}
        tooltip={t(PLACEHOLDERS.LABEL_COORDINATES)}
      >
        {point[0].toFixed(5)}, {point[1].toFixed(5)}
      </Bar>
    </CopyToast>
  );
};