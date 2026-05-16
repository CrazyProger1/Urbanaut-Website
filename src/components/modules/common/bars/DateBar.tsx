"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useFormatter } from "next-intl";
import { Tooltip } from "@/components/ui/next/tooltip";

type Props = {
  date: Date;
  label?: string;
};

export const DateBar = ({ date, label }: Props) => {
  const formatter = useFormatter();

  const formattedDate = formatter.dateTime(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const bar = (
    <Button variant="ghost" className="hover:bg-accent transition-colors" asChild>
      <div className="text-foreground flex h-9 items-center gap-1.5 rounded-md px-1.5 text-sm font-medium select-none">
        <Calendar className="text-primary h-5 w-5" />
        <span>{formattedDate}</span>
      </div>
    </Button>
  );

  if (label) {
    return (
      <Tooltip content={label} asChild>
        {bar}
      </Tooltip>
    );
  }

  return bar;
};
