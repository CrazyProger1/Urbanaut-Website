"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Flame } from "lucide-react";
import { PreservationBar } from "@/components/modules/common/bars";
import { PLACEHOLDERS } from "@/config";
import { PlacePreservation, PlaceSecurity } from "@/types";

type Props = {
  security?: PlaceSecurity;
  preservation?: PlacePreservation;
};

export const StateSection = ({ preservation }: Props) => {
  const t = useTranslations("Modules");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <Flame />
        <div className="font-semibold">{t(PLACEHOLDERS.SECTION_STATE)}</div>
      </div>
      <div className="flex flex-wrap justify-center gap-1">
        {preservation && <PreservationBar preservation={preservation} />}
      </div>
    </div>
  );
};
