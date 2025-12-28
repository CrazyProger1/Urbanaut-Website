import React, { useMemo } from "react";
import { APIListPlace } from "@/types";
import { Marker, useMap } from "react-leaflet";
import { LatLng } from "leaflet";
import { useMapBounds } from "@/components/modules/map/hooks";

type Props = {
  places?: APIListPlace[];
  enabledZoomOnClick?: boolean;
  zoomOnClick?: number;
  onSelect?: (place: APIListPlace) => void;
};

export const PlacesLayer = ({
  places,
  enabledZoomOnClick = false,
  zoomOnClick = 15,
  onSelect,
}: Props) => {
  const mapBounds = useMapBounds();
  const map = useMap();

  const visiblePlaces: APIListPlace[] = useMemo(() => {
    if (!places || !mapBounds) return [];
    return places.filter((place) => mapBounds.contains(new LatLng(place.point[0], place.point[1])));
  }, [places, mapBounds]);

  return (
    visiblePlaces &&
    visiblePlaces.map((place) => (
      <Marker
        key={place.id}
        position={[place.point[0], place.point[1]]}
        eventHandlers={{
          click: (event) => {
            if (enabledZoomOnClick) {
              map.setView(event.latlng, zoomOnClick);
            }
            onSelect?.(place);
          },
        }}
      />
    ))
  );
};
