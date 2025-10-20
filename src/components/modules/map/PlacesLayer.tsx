import React, { useMemo } from "react";
import { APIPlace } from "@/types";
import { Marker, Popup } from "react-leaflet";
import { LatLng } from "leaflet";
import { useMapBounds } from "@/components/modules/map/hooks";

type Props = {
  places?: APIPlace[];
};

export const PlacesLayer = ({ places }: Props) => {
  const mapBounds = useMapBounds();

  const visiblePlaces: APIPlace[] = useMemo(() => {
    if (!places || !mapBounds) return [];
    return places.filter((place) =>
      mapBounds.contains(new LatLng(place.point.latitude, place.point.longitude)),
    );
  }, [places, mapBounds]);

  return (
    visiblePlaces &&
    visiblePlaces.map((place) => (
      <Marker key={place.id} position={[place.point.latitude, place.point.longitude]}>
        <Popup>{place.name}</Popup>
      </Marker>
    ))
  );
};
