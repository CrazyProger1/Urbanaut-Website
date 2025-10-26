import React, { useState } from "react";
import { LatLng } from "leaflet";
import { Marker, Polygon, useMapEvents } from "react-leaflet";

export const AreaChoosingTool = () => {
  const [points, setPoints] = useState<LatLng[]>([]);

  useMapEvents({
    click: (event) => {
      setPoints((prev) => [...prev, event.latlng]);
    },
  });

  return (
    <div>
      {points.map((point, index) => (
        <Marker
          eventHandlers={{
            dragend: (event) => {
              const endPosition = event.target.getLatLng();
              const newPoints = [...points];
              newPoints[index] = endPosition;
              setPoints(newPoints);
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
