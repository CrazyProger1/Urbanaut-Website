import { LatLng, type Map as LeafletMap } from "leaflet";
import { useMap, useMapEvents } from "react-leaflet";
import { useEffect } from "react";

type Props = {
  onClickCoordinates?: (latlng: LatLng) => void;
  onMouseCoordinates?: (latlng: LatLng) => void;
  onMapLoaded?: (map: LeafletMap) => void;
};

export const MapWatcher = ({ onClickCoordinates, onMouseCoordinates, onMapLoaded }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      onMapLoaded?.(map);
    }
  }, [map, onMapLoaded]);

  useMapEvents({
    mousedown: (e) => {
      onClickCoordinates?.(e.latlng);
    },
    mousemove: (e) => {
      onMouseCoordinates?.(e.latlng);
    },
  });
  return null;
};
