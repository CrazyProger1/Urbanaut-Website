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
        <TileLayer url={layer.url} attribution={layer.attribution} />
      ))}
    </div>
  );
  // switch (primaryLayer) {
  //   case "ESRI":
  //     return (
  //       <TileLayer
  //         url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  //         attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
  //       />
  //     );
  //   case "CyclOSM":
  //     return (
  //       <TileLayer
  //         url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
  //         attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //       />
  //     );
  // }
  // return (
  //   <TileLayer
  //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //   />
  // );
};
