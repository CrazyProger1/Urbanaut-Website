"use client";

import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import { APIPlace } from "@/types";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Plus } from "lucide-react";

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
    <ContextMenu>
      <ContextMenuTrigger style={{ height: "100%", width: "100%" }}>
        <MapContainer
          className="-z-0"
          center={position}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {places && places.map(place => (
            <Marker key={place.id} position={[place.point.latitude, place.point.longitude]}>
              <Popup>
                {place.name}
              </Popup>
            </Marker>))}
        </MapContainer>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem><Plus/> Place </ContextMenuItem>
        <ContextMenuItem><Plus/> Area </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Coordinates</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default LeafletDynamicMap;
