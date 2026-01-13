"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLng, LatLngBounds, type Map as LeafletMap } from "leaflet";

// World bounds to prevent panning outside the map
const WORLD_BOUNDS = new LatLngBounds(
  [-85.051129, -180], // Southwest corner
  [85.051129, 180], // Northeast corner
);

import { APIListPlace, APIListArea, MapLayer } from "@/types";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import MapContextMenu from "./MapContextMenu";
import { ICONS, LAYERS, PAGES, PLACEHOLDERS, QUERIES } from "@/config";
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
import { TileLayers, PlacesLayer, AreasLayer, ClusteringLayer } from "./layers";
import { toast } from "sonner";
import { MapPageParams } from "@/types/components/map";
import { getAreas, getPlaces } from "@/actions";
import { useMapStore } from "@/stores";
import { SearchCoordinatesTool } from "@/components/modules/map/tools/SearchCoordinatesTool";
import { setClipboard } from "@/utils/clipboard";
import { buildParamsFromRecord } from "@/utils/params";

type Props = {
  center?: LatLng;
  zoom?: number;
  filters?: MapPageParams;
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
    updateCurrentMapMeasures,
    loadMapMeasures,
    setLastRightClickCoordinates,
    lastRightClickCoordinates,
  } = useMapStore();
  const [map, setMap] = useState<LeafletMap | null>(null);
  const areaChoosingToolRef = useRef<AreaChoosingToolHandle>(null);
  const placeChoosingToolRef = useRef<PlaceChoosingToolHandle>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPrimaryLayer, setCurrentPrimaryLayer] = useState<MapLayer>(LAYERS.OSM);
  const [currentSecondaryLayers, setCurrentSecondaryLayers] = useState<MapLayer[]>([]);
  const [places, setPlaces] = useState<APIListPlace[]>([]);
  const [areas, setAreas] = useState<APIListArea[]>([]);

  useEffect(() => {
    if (!map) return;

    const container = map.getContainer();

    const handleContextMenu = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const point = L.point(e.clientX - rect.left, e.clientY - rect.top);
      const latlng = map.containerPointToLatLng(point);
      setLastRightClickCoordinates(latlng);
    };

    container.addEventListener("contextmenu", handleContextMenu);

    return () => {
      container.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [map]);
  useEffect(() => {
    if (!map) {
      return;
    }
    if (searchParams.get(QUERIES.MAP_SELECTED_POINT)) {
      return;
    }

    const measures = loadMapMeasures();

    if (!measures) {
      return;
    }

    const { center, zoom } = measures;

    if (center && zoom) {
      map.setView(center, zoom);
    }
  }, [map]);

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
  }, [filters]);

  useEffect(() => {
    if (!map) {
      return;
    }

    const updateBounds = () => {
      updateCurrentMapMeasures(map.getBounds(), map.getCenter(), map.getZoom());
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
        iconRetinaUrl: ICONS.PLACE_MARKER_ICON_RETINA,
        iconUrl: ICONS.PLACE_MARKER_ICON,
        shadowUrl: ICONS.PLACE_MARKER_SHADOW,
      });
    })();
  }, []);

  const handleCenterMap = useCallback(() => {
    if (!map) {
      return;
    }

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
        params.set(QUERIES.PLACE_ADDING_MODAL, "true");
        params.set(QUERIES.MAP_SELECTED_POINT, `${point.lat},${point.lng}`);

        router.push(`?${params}`, { scroll: false });
      }
    }

    if (isChoosingArea && areaChoosingToolRef.current) {
      toggleChoosingArea(false);

      const points = areaChoosingToolRef.current.getPoints();

      if (points) {
        params.set(QUERIES.AREA_ADDING_MODAL, "true");
        params.set("points", points.map((point) => `${point.lat},${point.lng}`).join(";"));

        router.push(`?${params}`, { scroll: false });
      }
    }
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
    (place: APIListPlace) => {
      const params = buildParamsFromRecord(
        { [QUERIES.PLACE_SHEET]: String(place.id), point: "" },
        searchParams,
      );

      router.push(`${PAGES.MAP}?${params}`, { scroll: false });
    },
    [searchParams],
  );

  const handleAreaSelect = useCallback(
    (area: APIListArea) => {
      const params = buildParamsFromRecord(
        { [QUERIES.AREA_SHEET]: String(area.id), point: "" },
        searchParams,
      );
      router.push(`${PAGES.MAP}?${params}`, { scroll: false });
    },
    [searchParams],
  );

  const handleSearchByCoordinates = (point: LatLng) => {
    map?.setView(point, 15);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger style={{ height: "100%", width: "100%" }}>
        <div className="relative z-50">
          <SearchBar onSearchByCoordinates={handleSearchByCoordinates} />
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
          minZoom={3}
          className="-z-0"
          center={center}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          maxBounds={WORLD_BOUNDS}
        >
          <TileLayers layers={[currentPrimaryLayer, ...currentSecondaryLayers]} />
          {isPlacesVisible && (
            // <ZoomSwitch minZoom={markerVisibilityMinimumZoomThreshold}>
            <ClusteringLayer>
              <PlacesLayer places={places} enabledZoomOnClick={true} onSelect={handlePlaceSelect} />
            </ClusteringLayer>
            // </ZoomSwitch>
          )}
          {isAreasVisible && (
            // <ZoomSwitch minZoom={areaVisibilityMinimumZoomThreshold}>
            <AreasLayer areas={areas} enabledZoomOnClick={true} onSelect={handleAreaSelect} />
            // </ZoomSwitch>
          )}
          {isCoordinatesVisible && <CoordinatesTool />}
          {isRulerActive && <RulerTool />}
          {isChoosingArea && <AreaChoosingTool ref={areaChoosingToolRef} />}
          {isChoosingPlace && <PlaceChoosingTool ref={placeChoosingToolRef} />}
          <SearchCoordinatesTool />
        </MapContainer>
      </ContextMenuTrigger>
      <MapContextMenu
        onCopyCoordinates={() => {
          toast.success(PLACEHOLDERS.COORDINATES_COPIED_TOAST);
          if (lastRightClickCoordinates) {
            setClipboard(`${lastRightClickCoordinates?.lat}, ${lastRightClickCoordinates?.lng}`);
          }
        }}
      />
      <ToolBar onCenterMap={handleCenterMap} onSavePlace={handleSave} />
    </ContextMenu>
  );
};

export default DynamicMap;
