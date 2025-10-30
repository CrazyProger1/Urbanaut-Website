import React from "react";
import { MapLayer } from "@/types";
import { TileLayer } from "react-leaflet";

type Props = {
  layers: MapLayer[];
};

export const TileLayers = ({ layers }: Props) => {
  return (
    <div>
      {layers.map((layer) => (
        <TileLayer key={layer.value} url={layer.url} attribution={layer.attribution} />
      ))}
    </div>
  );
};
