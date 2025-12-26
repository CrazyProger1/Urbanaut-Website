"use client";

import React, { useEffect, useState, useRef } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import { Card } from "@/components/ui/card";

export const CoordinatesTool = () => {
  const [currentCoordinates, setCurrentCoordinates] = useState<LatLng | undefined>();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null); // Ref to measure the card
  const map = useMap();

  useMapEvents({
    mousemove: (e) => {
      setCurrentCoordinates(e.latlng);
    },
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;

      if (cardRef.current) {
        const { offsetWidth, offsetHeight } = cardRef.current;
        const padding = 0;

        if (x + offsetWidth + padding > window.innerWidth) {
          x = x - offsetWidth - padding;
        } else {
          x = x + padding;
        }

        if (y + offsetHeight + padding > window.innerHeight) {
          y = y - offsetHeight - padding;
        } else {
          y = y + padding;
        }
      }

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!currentCoordinates) return null;

  return (
    <Card
      ref={cardRef}
      className="bg-background/80 pointer-events-none fixed z-[9999] px-2 py-1 shadow-lg backdrop-blur-sm"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transition: "none",
      }}
    >
      <div className="font-mono text-xs">
        {currentCoordinates.lat.toFixed(5)}, {currentCoordinates.lng.toFixed(5)}
      </div>
    </Card>
  );
};
