"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tooltip } from "@/components/ui/next/tooltip";
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
      <Tooltip content={t(PLACEHOLDERS.LABEL_COORDINATES)} asChild>
        <Button variant="ghost" className="hover:bg-accent transition-colors" asChild>
          <div className="text-foreground flex h-9 items-center gap-1.5 rounded-md px-1.5 text-sm font-medium select-none">
            <MapPin className="text-primary h-5 w-5" />
            <span className="tabular-nums">
              {point[0].toFixed(5)}, {point[1].toFixed(5)}
            </span>
          </div>
        </Button>
      </Tooltip>
    </CopyToast>
  );
};
