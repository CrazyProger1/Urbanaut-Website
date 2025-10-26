import React, { useMemo, useState } from "react";
import { LatLng } from "leaflet";
import { Marker, Polyline, Tooltip, useMapEvents } from "react-leaflet";

export const RulerTool = () => {
  const [points, setPoints] = useState<LatLng[]>([]);

  useMapEvents({
    click: (event) => {
      setPoints((prev) => [...prev, event.latlng]);
    },
  });

  const distances = useMemo(() => {
    let distance = 0;
    let prevPoint: LatLng;
    return points.map((point) => {
      if (prevPoint) {
        distance += prevPoint.distanceTo(point);
      }
      prevPoint = point;
      return distance;
    });
  }, [points]);

  const getDistanceLabel = (distance: number) => {
    return distance > 1000 ? (distance / 1000).toFixed(2) + " km" : distance.toFixed(0) + " m";
  };

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
        >
          <Tooltip direction="bottom" offset={[-15, 30]} opacity={1} permanent>
            {getDistanceLabel(distances[index])}
          </Tooltip>
        </Marker>
      ))}
      <Polyline positions={points} />
    </div>
  );
};
