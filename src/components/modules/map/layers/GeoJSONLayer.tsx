import React from "react";
import { GeoJSON } from "react-leaflet/GeoJSON";
import L from "leaflet";

type Props = {
  data: GeoJSON.FeatureCollection;
  onPlaceSelect?: (id: number) => void;
};

export const GeoJSONLayer = ({ data, onPlaceSelect }: Props) => {
  return (
    <GeoJSON
      key={JSON.stringify(data)}
      data={data}
      pointToLayer={(feature, latlng) => {
        const marker = L.marker(latlng);
        marker.on("click", () => {
          if (feature.properties.type === "Place") {
            onPlaceSelect?.(feature.properties.id);
          }
        });
        return marker;
      }}
    />
  );
};
