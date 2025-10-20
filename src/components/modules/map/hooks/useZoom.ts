import { useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";

export const useZoom = () => {
  const [zoom, setZoom] = useState(0);
  const map = useMap();

  useMapEvents({
    zoomend: () => setZoom(map.getZoom()),
  });
  return zoom;
};
