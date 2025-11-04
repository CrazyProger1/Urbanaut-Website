"use client";

import React from "react";
import { toast } from "sonner";
import { setClipboard } from "@/utils/clipboard";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  clipboard?: string;
  children?: React.ReactNode;
};

export const CopyToast = ({ className, clipboard, children }: Props) => {
  return (
    <span
      className={cn(className, "cursor-pointer")}
      onClick={() => {
        toast.success("Copied to clipboard!");
        if (clipboard) {
          setClipboard(clipboard);
        }
      }}
    >
      {children}
    </span>
  );
};
