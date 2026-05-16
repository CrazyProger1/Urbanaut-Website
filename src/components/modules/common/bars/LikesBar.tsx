"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tooltip } from "@/components/ui/next/tooltip";
import { PLACEHOLDERS } from "@/config";

type Props = {
  likes: number;
};

export const LikesBar = ({ likes }: Props) => {
  const t = useTranslations("Modules");

  return (
    <Tooltip content={t(PLACEHOLDERS.TOOLTIP_FAVORITES)} asChild>
      <Button variant="ghost" className="hover:bg-accent transition-colors" asChild>
        <div className="text-foreground flex h-9 items-center gap-1.5 rounded-md px-1.5 text-sm font-medium select-none">
          <Heart className="text-primary h-5 w-5" />
          <span className="tabular-nums">{likes}</span>
        </div>
      </Button>
    </Tooltip>
  );
};
