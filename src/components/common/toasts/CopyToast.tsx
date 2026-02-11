"use client";

import React from "react";
import { toast } from "sonner";
import { setClipboard } from "@/utils/clipboard";
import { cn } from "@/lib/utils";
import { PLACEHOLDERS } from "@/config";
import { useTranslations } from "next-intl";

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
  message,
}: Props) => {
  const t = useTranslations("Common");
  const resolvedMessage = message ?? t(PLACEHOLDERS.TOAST_COPIED_INTO_CLIPBOARD);
  return (
    <span
      className={cn(className, "cursor-pointer select-none")}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
        toast.success(resolvedMessage);
        if (clipboard) {
          setClipboard(clipboard);
        }
      }}
    >
      {children}
    </span>
  );
};
