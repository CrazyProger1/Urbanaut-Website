import React from "react";
import { APIPlace } from "@/types";
import { Marker, Popup } from "react-leaflet";

type Props = {
  places?: APIPlace[];
};

export const PlacesLayer = ({ places }: Props) => {
  return (
    places &&
    places.map((place) => (
      <Marker key={place.id} position={[place.point.latitude, place.point.longitude]}>
        <Popup>{place.name}</Popup>
      </Marker>
    ))
  );
};
