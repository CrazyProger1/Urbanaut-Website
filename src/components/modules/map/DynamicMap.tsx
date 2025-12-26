"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLng, LatLngBounds, type Map as LeafletMap } from "leaflet";
import { APIPlace, MapLayer } from "@/types";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import MapContextMenu from "./MapContextMenu";
import { ICONS, LAYERS, PAGES, QUERIES } from "@/config";
import { APIArea } from "@/types/api";
import { ToolBar, LayersBar, SearchBar } from "@/components/modules/map/bars";
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
import { TileLayers, PlacesLayer, AreasLayer } from "./layers";
import { toast } from "sonner";
import { MapPageFilters } from "@/types/map";
import { getAreas, getPlaces } from "@/actions";
import { useMapStore } from "@/stores";

type Props = {
  center?: LatLng;
  zoom?: number;
  filters?: MapPageFilters;
  markerVisibilityMinimumZoomThreshold?: number;
  areaVisibilityMinimumZoomThreshold?: number;
};

const DynamicMap = ({
  center = new LatLng(50.4663775681885, 30.583190917968754),
  zoom = 5,
  markerVisibilityMinimumZoomThreshold = 10,
  areaVisibilityMinimumZoomThreshold = 10,
  filters,
}: Props) => {
  const {
    isAreasVisible,
    isPlacesVisible,
    isChoosingPlace,
    isChoosingArea,
    isRulerActive,
    isCoordinatesVisible,
    toggleChoosingPlace,
    toggleChoosingArea,
  } = useMapStore();
  const [map, setMap] = useState<LeafletMap | null>(null);
  const areaChoosingToolRef = useRef<AreaChoosingToolHandle>(null);
  const placeChoosingToolRef = useRef<PlaceChoosingToolHandle>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPrimaryLayer, setCurrentPrimaryLayer] = useState<MapLayer>(LAYERS.OSM);
  const [currentSecondaryLayers, setCurrentSecondaryLayers] = useState<MapLayer[]>([]);
  const [places, setPlaces] = useState<APIPlace[]>([]);
  const [areas, setAreas] = useState<APIArea[]>([]);
  const [currentMapBounds, setCurrentMapBounds] = useState<LatLngBounds>();

  useEffect(() => {
    const fetchData = async () => {
      const placesResponse = await getPlaces(filters);
      const areasResponse = await getAreas();

      if (placesResponse.success) {
        setPlaces(placesResponse.results);
      }
      if (areasResponse.success) {
        setAreas(areasResponse.results);
      }
    };
    fetchData();
  }, [filters, currentMapBounds]);

  useEffect(() => {
    if (!map) return;

    const updateBounds = () => {
      const bounds = map.getBounds();
      setCurrentMapBounds(bounds);
    };

    map.addEventListener("zoomend", updateBounds);
    map.addEventListener("moveend", updateBounds);

    return () => {
      map.removeEventListener("zoomend", updateBounds);
      map.removeEventListener("moveend", updateBounds);
    };
  }, [map]);

  useEffect(() => {
    (async function init() {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: ICONS.MARKER_ICON_RETINA,
        iconUrl: ICONS.MARKER_ICON,
        shadowUrl: ICONS.MARKER_SHADOW,
      });
    })();
  }, []);

  const handleAddPlace = () => {
    toggleChoosingPlace(true);
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
      toggleChoosingPlace(false);

      const point = placeChoosingToolRef.current.getPoint();

      if (point) {
        params.set(QUERIES.PLACE_MODAL, "true");
        params.set("point", `${point.lat},${point.lng}`);

        router.push(`?${params}`, { scroll: false });
      }
    }

    if (isChoosingArea && areaChoosingToolRef.current) {
      toggleChoosingArea(false);

      const points = areaChoosingToolRef.current.getPoints();

      if (points) {
        params.set(QUERIES.AREA_MODAL, "true");
        params.set("points", points.map((point) => `${point.lat},${point.lng}`).join(";"));

        router.push(`?${params}`, { scroll: false });
      }
    }
  };

  const handleAddArea = () => {
    toggleChoosingArea(true);
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

  const handlePlaceSelect = useCallback(
    (place: APIPlace) => {
      const params = new URLSearchParams(searchParams);
      params.set(QUERIES.PLACE_SHEET, String(place.id));
      router.push(`${PAGES.MAP}?${params}`, { scroll: false });
    },
    [searchParams],
  );

  const handleAreaSelect = useCallback(
    (area: APIArea) => {
      const params = new URLSearchParams(searchParams);
      params.set(QUERIES.AREA_SHEET, String(area.id));
      router.push(`${PAGES.MAP}?${params}`, { scroll: false });
    },
    [searchParams],
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger style={{ height: "100%", width: "100%" }}>
        <div className="relative z-50">
          <SearchBar />
          <LayersBar
            layers={Object.values(LAYERS)}
            onPrimaryLayerChange={handlePrimaryLayerChange}
            onSecondaryLayerToggle={handleSecondaryLayerToggle}
            defaultPrimary={currentPrimaryLayer || LAYERS.OSM}
            defaultSecondary={currentSecondaryLayers}
          />
        </div>
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
              <PlacesLayer places={places} enabledZoomOnClick={true} onSelect={handlePlaceSelect} />
            </ZoomSwitch>
          )}
          {isAreasVisible && (
            <ZoomSwitch minZoom={areaVisibilityMinimumZoomThreshold}>
              <AreasLayer areas={areas} enabledZoomOnClick={true} onSelect={handleAreaSelect} />
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
        onCenterMap={handleCenterMap}
        onSavePlace={handleSave}
      />
    </ContextMenu>
  );
};

export default DynamicMap;
