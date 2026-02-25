import React, { useMemo } from "react";
import { Place } from "@/types";
import { Marker, useMap } from "react-leaflet";
import L, { LatLng } from "leaflet";
import { useMapBounds } from "@/components/modules/map/hooks";
import { ICONS } from "@/config";

type Props = {
  places?: Place[];
  enabledZoomOnClick?: boolean;
  zoomOnClick?: number;
  onSelect?: (place: Place) => void;
};

export const PlacesLayer = ({
  places,
  enabledZoomOnClick = false,
  zoomOnClick = 15,
  onSelect,
}: Props) => {
  const mapBounds = useMapBounds();
  const map = useMap();

  const visiblePlaces: Place[] = useMemo(() => {
    if (!places || !mapBounds) return [];
    return places.filter((place) => mapBounds.contains(new LatLng(place.point[0], place.point[1])));
  }, [places, mapBounds]);

  const favoriteIcon = useMemo(() => {
    return L.icon({
      iconUrl: ICONS.PLACE_FAVORITE_MARKER_ICON,
      iconRetinaUrl: ICONS.PLACE_FAVORITE_MARKER_ICON_RETINA,
      shadowUrl: ICONS.PLACE_FAVORITE_MARKER_SHADOW,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowSize: [41, 41],
      shadowAnchor: [12, 40],
    });
  }, []);

  const defaultIcon = useMemo(() => {
    return L.icon({
      iconUrl: ICONS.PLACE_MARKER_ICON,
      iconRetinaUrl: ICONS.PLACE_MARKER_ICON_RETINA,
      shadowUrl: ICONS.PLACE_MARKER_SHADOW,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowSize: [41, 41],
      shadowAnchor: [12, 40],
    });
  }, []);

  return (
    visiblePlaces &&
    visiblePlaces.map((place) => (
      <Marker
        icon={place.is_favorite ? favoriteIcon : defaultIcon}
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
