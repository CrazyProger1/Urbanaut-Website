"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/next/tooltip";
import { OptionalLink } from "@/components/common/utils";

type Props = {
  value: React.ReactNode;
  label: string;
  tooltip?: string;
  href?: string;
};

export const MetricItem = ({ value, label, tooltip, href }: Props) => {
  const item = (
    <OptionalLink href={href}>
      <Button
        variant="ghost"
        className="hover:bg-accent h-auto px-3 py-2 transition-colors"
        asChild
      >
        <div className="text-foreground flex flex-col items-center gap-0 rounded-md select-none">
          <div className="text-base font-bold tabular-nums">{value}</div>
          <div className="text-muted-foreground text-md">{label}</div>
        </div>
      </Button>
    </OptionalLink>
  );

  if (tooltip) {
    return (
      <Tooltip content={tooltip} asChild>
        {item}
      </Tooltip>
    );
  }
  return item;
};
