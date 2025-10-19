"use client";

import React, { useCallback, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Leaflet, { LatLng } from "leaflet";
import { APIPlace } from "@/types";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { setClipboard } from "@/utils/clipboard";
import MapContextMenu from "./MapContextMenu";
import { MapWatcher } from "./MapWatcher";
import { ICONS } from "@/config";
import PlacesLayer from "./PlacesLayer";
import AreasLayer from "./AreasLayer";
import { APIArea } from "@/types/api";

type Props = {
  center?: LatLng;
  zoom?: number;
  places?: APIPlace[];
  areas?: APIArea[];
};

const DynamicMap = ({
  center = new LatLng(50.45320424531352, 30.56808471679688),
  zoom = 5,
  areas,
  places,
}: Props) => {
  const [currentPosition, setCurrentPosition] = useState<LatLng | undefined>();

  useEffect(() => {
    (async function init() {
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: ICONS.MARKER_ICON_RETINA,
        iconUrl: ICONS.MARKER_ICON,
        shadowUrl: ICONS.MARKER_SHADOW,
      });
    })();
  }, []);

  const handleCopyCoordinates = useCallback(async () => {
    await setClipboard(`${currentPosition?.lat}, ${currentPosition?.lng}`);
  }, [currentPosition]);

  return (
    <ContextMenu>
      <ContextMenuTrigger style={{ height: "100%", width: "100%" }}>
        <MapContainer
          className="-z-0"
          center={center}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <MapWatcher
            onUpdateCoordinates={(latlng) => {
              setCurrentPosition(latlng);
            }}
          />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <PlacesLayer places={places} />
          <AreasLayer areas={areas} />
        </MapContainer>
      </ContextMenuTrigger>
      <MapContextMenu onCopyCoordinates={handleCopyCoordinates} />
    </ContextMenu>
  );
};

export default DynamicMap;
