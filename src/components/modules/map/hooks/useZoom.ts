import { useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";

export const useZoom = () => {
  const map = useMap();
  const [zoom, setZoom] = useState(20);

  useEffect(() => {
    if (!map) {
      return;
    }
    setZoom(map.getZoom());
  }, [map]);

  useMapEvents({
    zoomend: () => setZoom(map.getZoom()),
  });
  return zoom;
};
