"use client";

import React from "react";
import { Toaster } from "sonner";
import { UserTheme } from "@/types";

type Props = {
  children: React.ReactNode;
  theme?: UserTheme;
};

export const ToastProvider = ({ children, theme = "DARK" }: Props) => {
  return (
    <>
      {children}
      <Toaster position="top-right" richColors theme={theme === "DARK" ? "dark" : "light"} />
    </>
  );
};
