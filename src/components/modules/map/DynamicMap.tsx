"use client";

import React, { useCallback, useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Leaflet, { LatLng, type Map as LeafletMap } from "leaflet";
import { APIPlace } from "@/types";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { setClipboard } from "@/utils/clipboard";
import MapContextMenu from "./MapContextMenu";
import { MapWatcher } from "./MapWatcher";
import { ICONS } from "@/config";
import { PlacesLayer } from "./PlacesLayer";
import { AreasLayer } from "./AreasLayer";
import { APIArea } from "@/types/api";
import { Marker } from "react-leaflet";
import { ToolBar } from "@/components/modules/map/bars";
import { useRouter } from "@/i18n";

type Props = {
  center?: LatLng;
  zoom?: number;
  places?: APIPlace[];
  areas?: APIArea[];
};

const DynamicMap = ({
  center = new LatLng(50.4663775681885, 30.583190917968754),
  zoom = 5,
  areas,
  places,
}: Props) => {
  const [currentPosition, setCurrentPosition] = useState<LatLng | undefined>();
  const [newPlacePosition, setNewPlacePosition] = useState<LatLng | undefined>();
  const [choosingNewPlacePosition, setChoosingNewPlacePosition] = useState(false);
  const [newPlacePositionChosen, setNewPlacePositionChosen] = useState(false);
  const [isPlacesVisible, setIsPlacesVisible] = useState(true);
  const [isAreasVisible, setIsAreasVisible] = useState(true);
  const [map, setMap] = useState<LeafletMap | null>(null);
  const router = useRouter();

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

  const handleCancel = useCallback(() => {
    setNewPlacePosition(undefined);
    setChoosingNewPlacePosition(false);
    setNewPlacePositionChosen(false);
  }, []);

  const handleClickCoordinates = useCallback(
    (latlng: LatLng) => {
      if (choosingNewPlacePosition) {
        setChoosingNewPlacePosition(false);
        setNewPlacePositionChosen(true);
      }

      setCurrentPosition(latlng);
    },
    [choosingNewPlacePosition],
  );

  const handleMouseCoordinates = useCallback(
    (latlng: LatLng) => {
      if (choosingNewPlacePosition) {
        setNewPlacePosition(latlng);
      }
    },
    [choosingNewPlacePosition],
  );

  const handleAddPlace = () => {
    setChoosingNewPlacePosition(true);
    setNewPlacePositionChosen(false);
  };

  const togglePlacesVisibility = () => {
    setIsPlacesVisible((prev) => !prev);
  };

  const toggleAreasVisibility = () => {
    setIsAreasVisible((prev) => !prev);
  };

  const handleCenterMap = useCallback(() => {
    if (!map) return;

    navigator?.geolocation.getCurrentPosition((position) => {
      map.setView(new LatLng(position.coords.latitude, position.coords.longitude));
    });
  }, [map]);

  const handleSavePlace = () => {
    const stringPoint = `${newPlacePosition?.lat},${newPlacePosition?.lng}`;
    setNewPlacePosition(undefined);
    setChoosingNewPlacePosition(false);
    setNewPlacePositionChosen(false);

    const params = new URLSearchParams();
    params.set("addplace", "true");
    params.set("point", stringPoint);
    router.push(`?${params}`);
  };

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
            onClickCoordinates={handleClickCoordinates}
            onMouseCoordinates={handleMouseCoordinates}
            onMapLoaded={setMap}
          />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {isPlacesVisible && <PlacesLayer places={places} />}
          {isAreasVisible && <AreasLayer areas={areas} />}
          {newPlacePosition && <Marker position={newPlacePosition} />}
        </MapContainer>
      </ContextMenuTrigger>
      <MapContextMenu onCopyCoordinates={handleCopyCoordinates} onAddPlace={handleAddPlace} />
      <ToolBar
        showPlaceControls={newPlacePositionChosen}
        isAreasVisible={isAreasVisible}
        isPlacesVisible={isPlacesVisible}
        onToggleAreasVisible={toggleAreasVisibility}
        onTogglePlacesVisible={togglePlacesVisibility}
        onCenterMap={handleCenterMap}
        onCancel={handleCancel}
        onSavePlace={handleSavePlace}
      />
    </ContextMenu>
  );
};

export default DynamicMap;
