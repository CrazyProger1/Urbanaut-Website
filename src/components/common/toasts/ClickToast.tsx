"use client";

import React from "react";
import { toast } from "sonner";
import { setClipboard } from "@/utils/clipboard";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children?: React.ReactNode;
  message?: string;
};

export const ClickToast = ({ className, children, message = "Clicked!" }: Props) => {
  return (
    <span
      className={cn(className, "cursor-pointer select-none")}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
        toast.success(message);
      }}
    >
      {children}
    </span>
  );
};
