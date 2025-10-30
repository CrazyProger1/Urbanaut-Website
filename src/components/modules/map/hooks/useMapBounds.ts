import { useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngBounds } from "leaflet";

export const useMapBounds = () => {
  const map = useMap();
  const [currentMapBounds, setCurrentMapBounds] = useState<LatLngBounds>();

  useMapEvents({
    zoomend: () => {
      setCurrentMapBounds(map.getBounds());
    },
    moveend: () => {
      setCurrentMapBounds(map.getBounds());
    },
  });

  useEffect(() => {
    if (!map) {
      return;
    }

    setCurrentMapBounds(map.getBounds());
  }, [map]);

  return currentMapBounds;
};
