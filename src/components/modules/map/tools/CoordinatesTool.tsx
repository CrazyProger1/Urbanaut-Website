"use client";

import React, { useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import { Card } from "@/components/ui/card";

export const CoordinatesTool = () => {
  const [currentCoordinates, setCurrentCoordinates] = useState<LatLng | undefined>();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const map = useMap();

  useMapEvents({
    mousemove: (e) => {
      setCurrentCoordinates(e.latlng);
    },
  });

  useEffect(() => {
    if (!map) return;

    const mapContainer = map.getContainer();

    if (!mapContainer) return;

    const handleMouseMove = (e: MouseEvent) => {
      console.log("mousemove", e.clientX, e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (mapContainer) {
      mapContainer.addEventListener("mousemove", handleMouseMove);

      return () => {
        mapContainer.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [map]);

  return (
    <Card
      className="bg-background/80 fixed z-[9999] px-2 py-1 shadow-lg backdrop-blur-sm"
      style={{ left: mousePosition.x, top: mousePosition.y }}
    >
      {currentCoordinates?.lat}, {currentCoordinates?.lng}
    </Card>
  );
};
