import React, { useMemo } from "react";
import { APIListArea } from "@/types";
import { Polygon, useMap } from "react-leaflet";
import { LatLng } from "leaflet";
import { useMapBounds } from "@/components/modules/map/hooks";

type Props = {
  areas?: APIListArea[];
  enabledZoomOnClick?: boolean;
  zoomOnClick?: number;
  onSelect?: (area: APIListArea) => void;
};

export const AreasLayer = ({
  areas,
  onSelect,
  enabledZoomOnClick = false,
  zoomOnClick = 15,
}: Props) => {
  const mapBounds = useMapBounds();
  const map = useMap();

  const polygons = useMemo(() => {
    return areas?.map((area) => area.polygon.map((point) => new LatLng(point[0], point[1])));
  }, [areas]);

  const visiblePolygons = useMemo(() => {
    if (!polygons || !mapBounds) return [];

    return polygons.filter((polygon) => polygon.some((point) => mapBounds.contains(point)));
  }, [mapBounds, polygons]);

  return (
    <>
      {visiblePolygons.map((polygon, index) => (
        <Polygon
          key={index}
          positions={polygon}
          eventHandlers={{
            click: (event) => {
              if (enabledZoomOnClick) {
                map.setView(event.latlng, zoomOnClick);
              }
              if (onSelect && areas && polygons) {
                onSelect(areas[polygons.indexOf(polygon)]);
              }
            },
          }}
        />
      ))}
    </>
  );
};
