"use client";

import dynamic from "next/dynamic";

export const LeafletMap = dynamic(() => import("./LeafletDynamicMap"), {
  ssr: false,
});
