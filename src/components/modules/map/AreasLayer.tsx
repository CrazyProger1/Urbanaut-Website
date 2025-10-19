"use client";

import React, { useMemo } from "react";
import { APIArea } from "@/types/api";
import { Polygon } from "react-leaflet";
import { LatLng } from "leaflet";

type Props = {
  areas?: APIArea[];
};

export const AreasLayer = ({ areas }: Props) => {
  const polygons = useMemo(() => {
    return areas?.map((area) =>
      area.polygon.map((point) => new LatLng(point.latitude, point.longitude)),
    );
  }, [areas]);

  return (
    <>
      {polygons?.map((polygon, index) => (
        <Polygon key={index} positions={polygon} />
      ))}
    </>
  );
};
