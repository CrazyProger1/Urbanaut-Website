"use client";

import { useEffect } from "react";
import OneSignal, { IInitObject } from "react-onesignal";

type Props = IInitObject;

export const OneSignalProvider = (options: Props) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      OneSignal.init({
        ...options,
      });
    }
  }, []);
  return null;
};
