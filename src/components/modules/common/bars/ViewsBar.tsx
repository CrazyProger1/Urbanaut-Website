"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tooltip } from "@/components/ui/next/tooltip";
import { PLACEHOLDERS } from "@/config";

type Props = {
  views: number;
};

export const ViewsBar = ({ views }: Props) => {
  const t = useTranslations("Modules");

  return (
    <Tooltip content={t(PLACEHOLDERS.TOOLTIP_VIEWS)} asChild>
      <Button variant="ghost" className="hover:bg-accent transition-colors" asChild>
        <div className="text-foreground flex h-9 items-center gap-1.5 rounded-md px-1.5 text-sm font-medium select-none">
          <Eye className="text-primary h-5 w-5" />
          <span className="tabular-nums">{views}</span>
        </div>
      </Button>
    </Tooltip>
  );
};
