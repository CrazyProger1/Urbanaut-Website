import React, { Ref, useImperativeHandle, useState } from "react";
import { LatLng } from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";

export type PlaceChoosingToolHandle = {
  getPoint: () => LatLng | undefined;
};

type Props = {
  ref?: Ref<PlaceChoosingToolHandle>;
};

export const PlaceChoosingTool = ({ ref }: Props) => {
  const [position, setPosition] = useState<LatLng>();
  const [isChoosingPosition, setIsChoosingPosition] = useState(true);

  useMapEvents({
    click: (event) => {
      setIsChoosingPosition(false);
      setPosition(event.latlng);
    },
    mousemove: (event) => {
      if (isChoosingPosition) {
        setPosition(event.latlng);
      }
    },
  });

  useImperativeHandle(ref, () => ({ getPoint: () => position }), [position]);

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
