import React, { useMemo, useState } from "react";
import L, { LatLng } from "leaflet";
import { Marker, Polyline, Tooltip, useMapEvents } from "react-leaflet";
import { ICONS } from "@/config";

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

  const icon = useMemo(() => {
    return L.icon({
      iconUrl: ICONS.MARKER_ICON,
      iconRetinaUrl: ICONS.MARKER_ICON_RETINA,
      shadowUrl: ICONS.MARKER_SHADOW,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowSize: [41, 41],
      shadowAnchor: [12, 40],
    });
  }, []);

  return (
    <div>
      {points.map((point, index) => (
        <Marker
          icon={icon}
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
