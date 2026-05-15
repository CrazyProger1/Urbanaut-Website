"use client";

import { PLACEHOLDERS } from "@/config";
import { Tooltip } from "@/components/ui/next/tooltip";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  karma: number;
};

export const KarmaBar = ({ karma }: Props) => {
  const t = useTranslations("Modules");
  return (
    <Tooltip content={t(PLACEHOLDERS.TOOLTIP_KARMA)} asChild>
      <Button variant="ghost" className="hover:bg-accent relative transition-colors" asChild>
        <div className="text-foreground flex h-9 items-center gap-1.5 rounded-md px-1.5 text-sm font-medium select-none">
          <Heart className="text-primary h-5 w-5" />
          <span className="tabular-nums">{karma}</span>
        </div>
      </Button>
    </Tooltip>
  );
};
