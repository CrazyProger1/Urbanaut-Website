import React, { useState } from "react";
import { LatLng } from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";

export const PlaceChoosingTool = () => {
  const [position, setPosition] = useState<LatLng>();
  const [isChoosingPosition, setIsChoosingPosition] = useState(true);

  useMapEvents({
    mouseover: (event) => {
      if (isChoosingPosition) {
        setPosition(event.latlng);
        setIsChoosingPosition(false);
      }
    },
  });

  if (!position) {
    return null;
  }

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (event) => {
          setPosition(event.target.getLatLng());
        },
      }}
    />
  );
};
