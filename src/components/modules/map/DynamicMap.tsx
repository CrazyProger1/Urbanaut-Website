"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Leaflet, { LatLng, type Map as LeafletMap } from "leaflet";
import { APIPlace, APITag, MapLayer } from "@/types";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import MapContextMenu from "./MapContextMenu";
import { ICONS, LAYERS } from "@/config";
import { PlacesLayer } from "./PlacesLayer";
import { AreasLayer } from "./AreasLayer";
import { APIArea } from "@/types/api";
import { ToolBar, LayersBar } from "@/components/modules/map/bars";
import { useRouter } from "@/i18n";
import {
  AreaChoosingTool,
  AreaChoosingToolHandle,
  PlaceChoosingTool,
  PlaceChoosingToolHandle,
  RulerTool,
  ZoomSwitch,
  CoordinatesTool,
} from "@/components/modules/map/tools";
import { useSearchParams } from "next/navigation";
import { TileLayers } from "./TileLayers";
import { toast } from "sonner";

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
  const [map, setMap] = useState<LeafletMap | null>(null);
  const areaChoosingToolRef = useRef<AreaChoosingToolHandle>(null);
  const placeChoosingToolRef = useRef<PlaceChoosingToolHandle>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPrimaryLayer, setCurrentPrimaryLayer] = useState<MapLayer>(LAYERS.OSM);
  const [currentSecondaryLayers, setCurrentSecondaryLayers] = useState<MapLayer[]>([]);

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

  const handleSecondaryLayerToggle = (layer: MapLayer, active: boolean) => {
    if (active) {
      if (!currentSecondaryLayers.includes(layer)) {
        setCurrentSecondaryLayers((prev) => [...prev, layer]);
      }
    } else {
      setCurrentSecondaryLayers((prev) => prev.filter((value) => value !== layer));
    }
  };

  const handlePrimaryLayerChange = (layer: MapLayer) => {
    setCurrentPrimaryLayer(layer);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger style={{ height: "100%", width: "100%" }}>
        <MapContainer
          ref={setMap}
          className="-z-0"
          center={center}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayers layers={[currentPrimaryLayer, ...currentSecondaryLayers]} />

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
          {isCoordinatesVisible && <CoordinatesTool />}
          {isRulerActive && <RulerTool />}
          {isChoosingArea && <AreaChoosingTool ref={areaChoosingToolRef} />}
          {isChoosingPlace && <PlaceChoosingTool ref={placeChoosingToolRef} />}
        </MapContainer>
      </ContextMenuTrigger>
      <MapContextMenu
        onAddPlace={handleAddPlace}
        onAddArea={handleAddArea}
        onCopyCoordinates={() => {
          toast.success("Coordinates copied into buffer.");
        }}
      />
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
      <LayersBar
        layers={Object.values(LAYERS)}
        onPrimaryLayerChange={handlePrimaryLayerChange}
        onSecondaryLayerToggle={handleSecondaryLayerToggle}
        defaultPrimary={currentPrimaryLayer || LAYERS.OSM}
        defaultSecondary={currentSecondaryLayers}
      />
    </ContextMenu>
  );
};

export default DynamicMap;
