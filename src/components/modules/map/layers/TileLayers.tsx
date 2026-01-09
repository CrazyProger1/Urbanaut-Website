import React from "react";
import { MapLayer } from "@/types";
import { TileLayer } from "react-leaflet";

type Props = {
  layers: MapLayer[];
};

export const TileLayers = ({ layers }: Props) => {
  return (
    <div key={JSON.stringify(layers)}>
      {layers.map(({value, url, attribution}) => (
        <TileLayer key={value} url={url} attribution={attribution} noWrap />
      ))}
    </div>
  );
};
