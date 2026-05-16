"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/next/tooltip";

type Props = {
  value: React.ReactNode;
  label: string;
  tooltip?: string;
};

export const MetricItem = ({ value, label, tooltip }: Props) => {
  const item = (
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