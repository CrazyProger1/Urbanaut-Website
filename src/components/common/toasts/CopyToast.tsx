"use client";

import React from "react";
import { toast } from "sonner";
import { setClipboard } from "@/utils/clipboard";
import { cn } from "@/lib/utils";
import { PLACEHOLDERS } from "@/config";

type Props = {
  className?: string;
  clipboard?: string;
  children?: React.ReactNode;
  message?: string;
};

export const CopyToast = ({
  className,
  clipboard,
  children,
  message = PLACEHOLDERS.TOAST_COPIED_INTO_CLIPBOARD,
}: Props) => {
  return (
    <span
      className={cn(className, "cursor-pointer select-none")}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
        toast.success(message);
        if (clipboard) {
          setClipboard(clipboard);
        }
      }}
    >
      {children}
    </span>
  );
};
