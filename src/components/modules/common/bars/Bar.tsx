"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/next/tooltip";
import { Link } from "@/i18n";
import { cn } from "@/lib/utils";
import { BaseColor, getBadgeClass } from "@/utils/colors";

type Props = {
  icon?: React.ReactNode;
  children: React.ReactNode;
  tooltip?: string;
  href?: string;
  color?: BaseColor;
  className?: string;
};

const INNER_CLASSNAME =
  "text-foreground flex h-9 items-center gap-1.5 rounded-md px-1.5 text-sm font-medium select-none";

export const Bar = ({ icon, children, tooltip, href, color, className }: Props) => {
  const inner = (
    <>
      {icon}
      <span className="tabular-nums">{children}</span>
    </>
  );

  const colorClass = color ? getBadgeClass(color) : "hover:bg-accent";

  const bar = (
    <Button
      variant="ghost"
      className={cn(color && "border", colorClass, "transition-colors", className)}
      asChild
    >
      {href ? (
        <Link href={href} className={INNER_CLASSNAME}>
          {inner}
        </Link>
      ) : (
        <div className={INNER_CLASSNAME}>{inner}</div>
      )}
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip content={tooltip} asChild>
        {bar}
      </Tooltip>
    );
  }
  return bar;
};