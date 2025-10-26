"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
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
import { ToolBar, CoordinatesBar } from "@/components/modules/map/bars";
import { useRouter } from "@/i18n";
import {
  AreaChoosingTool,
  AreaChoosingToolHandle,
  PlaceChoosingTool,
  PlaceChoosingToolHandle,
  RulerTool,
  ZoomSwitch,
} from "@/components/modules/map/tools";
import { useSearchParams } from "next/navigation";

type Props = {
  center?: LatLng;
  zoom?: number;
  places?: APIPlace[];
  areas?: APIArea[];
  markerVisibilityMinimumZoomThreshold?: number;
  areaVisibilityMinimumZoomThreshold?: number;
};

const DynamicMap = ({
  center = new LatLng(50.4663775681885, 30.583190917968754),
  zoom = 5,
  areas,
  places,
  markerVisibilityMinimumZoomThreshold = 10,
  areaVisibilityMinimumZoomThreshold = 10,
}: Props) => {
  const [isPlacesVisible, setIsPlacesVisible] = useState(true);
  const [isAreasVisible, setIsAreasVisible] = useState(true);
  const [isChoosingArea, setIsChoosingArea] = useState(false);
  const [isChoosingPlace, setIsChoosingPlace] = useState(false);
  const [isCoordinatesVisible, setIsCoordinatesVisible] = useState(false);
  const [isRulerActive, setIsRulerActive] = useState(false);
  const [map, setMap] = useState<LeafletMap | undefined>();
  const areaChoosingToolRef = useRef<AreaChoosingToolHandle>(null);
  const placeChoosingToolRef = useRef<PlaceChoosingToolHandle>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    (async function init() {
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: ICONS.MARKER_ICON_RETINA,
        iconUrl: ICONS.MARKER_ICON,
        shadowUrl: ICONS.MARKER_SHADOW,
      });
    })();
  }, []);

  const handleCancel = useCallback(() => {
    setIsChoosingPlace(false);
    setIsChoosingArea(false);
  }, []);

  const handleAddPlace = () => {
    setIsChoosingPlace(true);
  };

  const togglePlacesVisibility = () => {
    setIsPlacesVisible((prev) => !prev);
  };

  const toggleAreasVisibility = () => {
    setIsAreasVisible((prev) => !prev);
  };

  const toggleCoordinatesVisibility = () => {
    setIsCoordinatesVisible((prev) => !prev);
  };

  const toggleRulerActivity = () => {
    setIsRulerActive((prev) => !prev);
  };

  const handleCenterMap = useCallback(() => {
    if (!map) return;

    navigator?.geolocation.getCurrentPosition((position) => {
      map.setView(new LatLng(position.coords.latitude, position.coords.longitude));
    });
  }, [map]);

  const handleSave = () => {
    const params = new URLSearchParams(searchParams);

    if (isChoosingPlace && placeChoosingToolRef.current) {
      setIsChoosingPlace(false);

      const point = placeChoosingToolRef.current.getPoint();

      if (point) {
        params.set("addplace", "true");
        params.set("point", `${point.lat},${point.lng}`);

        router.push(`?${params}`, { scroll: false });
      }
    }

    if (isChoosingArea && areaChoosingToolRef.current) {
      setIsChoosingArea(false);

      const points = areaChoosingToolRef.current.getPoints();

      if (points) {
        params.set("addarea", "true");
        params.set("points", points.map((point) => `${point.lat},${point.lng}`).join(";"));

        router.push(`?${params}`, { scroll: false });
      }
    }
  };

  const handleAddArea = () => {
    setIsChoosingArea(true);
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
          <MapWatcher onMapLoaded={setMap} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {isPlacesVisible && (
            <ZoomSwitch minZoom={markerVisibilityMinimumZoomThreshold}>
              <PlacesLayer places={places} />
            </ZoomSwitch>
          )}
          {isAreasVisible && (
            <ZoomSwitch minZoom={areaVisibilityMinimumZoomThreshold}>
              <AreasLayer areas={areas} />
            </ZoomSwitch>
          )}
          {isCoordinatesVisible && <CoordinatesBar />}
          {isRulerActive && <RulerTool />}
          {isChoosingArea && <AreaChoosingTool ref={areaChoosingToolRef} />}
          {isChoosingPlace && <PlaceChoosingTool ref={placeChoosingToolRef} />}
        </MapContainer>
      </ContextMenuTrigger>
      <MapContextMenu onAddPlace={handleAddPlace} onAddArea={handleAddArea} />
      <ToolBar
        showSaveControls={isChoosingPlace || isChoosingArea}
        isAreasVisible={isAreasVisible}
        isPlacesVisible={isPlacesVisible}
        isCoordinatesVisible={isCoordinatesVisible}
        isRulerActive={isRulerActive}
        onToggleAreasVisible={toggleAreasVisibility}
        onTogglePlacesVisible={togglePlacesVisibility}
        onToggleCoordinatesVisible={toggleCoordinatesVisibility}
        onToggleRulerActive={toggleRulerActivity}
        onCenterMap={handleCenterMap}
        onCancel={handleCancel}
        onSavePlace={handleSave}
      />
    </ContextMenu>
  );
};

export default DynamicMap;
