"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { CoordinatesBar } from "@/components/modules/common/bars";
import { Point } from "@/types";
import { PLACEHOLDERS } from "@/config";

type Props = {
  point?: Point;
  address?: string;
};

export const LocationSection = ({ point }: Props) => {
  const t = useTranslations("Modules");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <MapPin />
        <div className="font-semibold">{t(PLACEHOLDERS.SECTION_LOCATION)}</div>
      </div>
      <div className="flex flex-wrap justify-center gap-1">
        {point && <CoordinatesBar point={point} />}
      </div>
    </div>
  );
};
