import React, { useEffect, useMemo, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import L, { LatLng } from "leaflet";
import { ICONS } from "@/config";
import { useSearchParams } from "next/navigation";
import { parseCoordinates } from "@/utils/map";

export const SearchCoordinatesTool = () => {
  const params = useSearchParams();
  const [coordinates, setCoordinates] = useState<LatLng>();
  const map = useMap();

  useEffect(() => {
    const point = parseCoordinates(params.get("point") || "");

    if (point) {
      setCoordinates(point);
      map?.setView(point, 15);
    }
  }, [params]);

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

  if (!coordinates) {
    return null;
  }

  return <Marker position={coordinates} icon={icon} />;
};
