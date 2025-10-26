import React, { Ref, useImperativeHandle, useState } from "react";
import { LatLng } from "leaflet";
import { Marker, Polygon, useMapEvents } from "react-leaflet";

export type AreaChoosingToolHandle = {
  getPoints: () => LatLng[];
};

type Props = {
  ref?: Ref<AreaChoosingToolHandle>;
};

export const AreaChoosingTool = ({ ref }: Props) => {
  const [points, setPoints] = useState<LatLng[]>([]);
  const [mousePosition, setMousePosition] = useState<LatLng>();
  const [mouseOverMarker, setMouseOverMarker] = useState<boolean>(false);

  useMapEvents({
    click: (event) => {
      setPoints((prev) => [...prev, event.latlng]);
    },
    mousemove: (event) => {
      setMousePosition(event.latlng);
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      getPoints: () => points,
    }),
    [points],
  );
  return (
    <div>
      {mousePosition && !mouseOverMarker && <Marker position={mousePosition} />}
      {points.map((point, index) => (
        <Marker
          eventHandlers={{
            dragend: (event) => {
              const endPosition = event.target.getLatLng();
              const newPoints = [...points];
              newPoints[index] = endPosition;
              setPoints(newPoints);
            },
            mouseover: (event) => {
              setMouseOverMarker(true);
            },
            mouseout: (event) => {
              setMouseOverMarker(false);
            },
          }}
          draggable={true}
          position={point}
          key={index}
        />
      ))}
      <Polygon positions={points} />
    </div>
  );
};
