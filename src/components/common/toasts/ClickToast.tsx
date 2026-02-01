"use client";

import React from "react";
import { toast } from "sonner";
import { setClipboard } from "@/utils/clipboard";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children?: React.ReactNode;
  message?: string;
  passthrough?: boolean;
};

export const ClickToast = ({ className, children, message = "Clicked!", passthrough = false }: Props) => {
  return (
    <span
      className={cn(className, "cursor-pointer select-none")}
      onClick={(event) => {
        if (!passthrough) {
          event.stopPropagation();
          event.preventDefault();
        }
        toast.success(message);
      }}
    >
      {children}
    </span>
  );
};
