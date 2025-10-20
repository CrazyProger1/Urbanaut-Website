"use client";

import React, { useMemo } from "react";
import { APIArea } from "@/types/api";
import { Polygon } from "react-leaflet";
import { LatLng } from "leaflet";
import { useMapBounds } from "@/components/modules/map/hooks";

type Props = {
  areas?: APIArea[];
};

export const AreasLayer = ({ areas }: Props) => {
  const mapBounds = useMapBounds();

  const polygons = useMemo(() => {
    return areas?.map((area) =>
      area.polygon.map((point) => new LatLng(point.latitude, point.longitude)),
    );
  }, [areas]);

  const visiblePolygons = useMemo(() => {
    if (!polygons || !mapBounds) return [];

    return polygons.filter((polygon) => polygon.some((point) => mapBounds.contains(point)));
  }, [mapBounds, polygons]);

  return (
    <>
      {visiblePolygons.map((polygon, index) => (
        <Polygon key={index} positions={polygon} />
      ))}
    </>
  );
};
