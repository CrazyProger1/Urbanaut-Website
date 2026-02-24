"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPreservationColorClass } from "@/utils/classes";
import { Link } from "@/i18n";
import { PLACEHOLDERS } from "@/config";
import { PlacePreservation, PlaceSecurity } from "@/types";

type Props = {
  security?: PlaceSecurity;
  preservation?: PlacePreservation;
};

export const StateSection = ({ security, preservation }: Props) => {
  const t = useTranslations("Modules");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <Flame />
        <div className="font-semibold">{t(PLACEHOLDERS.SECTION_STATE)}</div>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        {/*<div>*/}
        {/*  {t(PLACEHOLDERS.LABEL_SECURITY)}:{" "}*/}
        {/*  <Link href={`?security=${security}`}>*/}
        {/*    <Badge className={getSecurityColorClass(security)}>{security}</Badge>*/}
        {/*  </Link>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  Difficulty:{" "}*/}
        {/*  <Badge className="bg-difficulty-impossible border-difficulty-impossible">*/}
        {/*    Impossible*/}
        {/*  </Badge>*/}
        {/*</div>*/}
        <div>
          {t(PLACEHOLDERS.LABEL_PRESERVATION)}:{" "}
          <Link href={`?preservation=${preservation?.level}`}>
            <Badge className={`${getPreservationColorClass(preservation?.level)} cursor-pointer`}>
              {preservation?.level &&
                t(
                  PLACEHOLDERS[
                    `LABEL_PRESERVATION_${preservation.level}` as keyof typeof PLACEHOLDERS
                  ],
                )}
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};
