import React, { useMemo } from "react";
import { useMapStore } from "@/stores";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { ICONS } from "@/config";

export const SearchCoordinatesTool = () => {
  const { searchCoordinates } = useMapStore();

  if (!searchCoordinates) {
    return null;
  }

  const icon = useMemo(() => {
    return L.icon({
      iconUrl: ICONS.MARKER_ICON,
      iconRetinaUrl: ICONS.MARKER_ICON_RETINA,
      shadowUrl: ICONS.MARKER_SHADOW,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowSize: [41, 41],
      shadowAnchor: [12, 40],
    });
  }, []);

  return <Marker position={searchCoordinates} icon={icon} />;
};
