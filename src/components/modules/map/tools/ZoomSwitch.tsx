"use client";

import React from "react";
import { useZoom } from "@/components/modules/map/hooks";

type Props = {
  maxZoom?: number;
  minZoom?: number;
  children?: React.ReactNode;
};

export const ZoomSwitch = ({ minZoom = -1, maxZoom = 30, children }: Props) => {
  const zoom = useZoom();

  if (zoom > maxZoom || zoom < minZoom) return;

  return <>{children}</>;
};
