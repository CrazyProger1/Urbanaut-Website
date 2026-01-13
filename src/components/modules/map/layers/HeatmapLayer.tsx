import React, { useEffect, useMemo } from "react";
import { Place } from "@/types";
import L, { LatLng } from "leaflet";
import "leaflet.heat";
import { useMap } from "react-leaflet";
import { useMapBounds } from "@/components/modules/map/hooks";

type Props = {
  places?: Place[];
};

const heatOptions = {
  radius: 25,
  blur: 15,
  max: 1.0,
  minOpacity: 0.2,
  gradient: {
    0.0: "blue",
    0.2: "cyan",
    0.4: "lime",
    0.6: "yellow",
    0.8: "orange",
    1.0: "red",
  },
};

export const HeatmapLayer = ({ places }: Props) => {
  const map = useMap();
  const mapBounds = useMapBounds();

  const visiblePoints: LatLng[] = useMemo(() => {
    if (!places || !mapBounds) return [];
    return places
      .map(({ point }) => new LatLng(point[0], point[1]))
      .filter((point) => mapBounds.contains(point));
  }, [places, mapBounds]);

  useEffect(() => {
    const points = visiblePoints?.map((point) => [point.lat, point.lng, 1]);
    // @ts-ignore
    const heat = L.heatLayer(points, heatOptions).addTo(map);
  }, [visiblePoints]);

  return <div></div>;
};
