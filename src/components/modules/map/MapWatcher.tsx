import { type Map as LeafletMap } from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";

type Props = {
  onMapLoaded?: (map: LeafletMap) => void;
  onZoomChanged?: (zoom: number) => void;
};

export const MapWatcher = ({ onMapLoaded }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      onMapLoaded?.(map);
    }
  }, [map, onMapLoaded]);

  return null;
};
