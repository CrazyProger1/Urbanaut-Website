"use client";

import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import { APIPlace } from "@/types";

type Props = {
  places?: APIPlace[];
}
const LeafletDynamicMap = ({ places }: Props) => {
  const position: [number, number] = [49.92051764012172, 36.42622863956798];

  useEffect(() => {
    (async function init() {
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
        iconUrl: "/leaflet/images/marker-icon.png",
        shadowUrl: "/leaflet/images/marker-shadow.png",
      });
    })();
  }, []);

  return (
    <MapContainer className="-z-0" center={position} zoom={10} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {places && places.map(place => (<Marker key={place.id} position={[place.point.latitude, place.point.longitude]}>
        <Popup>
          {place.name}
        </Popup>
      </Marker>))}

    </MapContainer>
  );
};

export default LeafletDynamicMap;
