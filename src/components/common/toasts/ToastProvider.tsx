"use client";

import React from "react";
import { Toaster } from "sonner";
import { APITheme } from "@/types/services/api/user";

type Props = {
  children: React.ReactNode;
  theme?: APITheme;
};

export const ToastProvider = ({ children, theme = "DARK" }: Props) => {
  return (
    <>
      {children}
      <Toaster position="bottom-right" richColors theme={theme === "DARK" ? "dark" : "light"} />
    </>
  );
};
