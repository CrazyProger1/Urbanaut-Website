"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLng, LatLngBounds, type Map as LeafletMap } from "leaflet";
import { GeoJSON } from "react-leaflet/GeoJSON";

// World bounds to prevent panning outside the map
const WORLD_BOUNDS = new LatLngBounds(
  [-85.051129, -180], // Southwest corner
  [85.051129, 180], // Northeast corner
);

import { User } from "@/types";
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
  CoordinatesTool,
} from "@/components/modules/map/tools";
import { useSearchParams } from "next/navigation";
import { TileLayers, ClusteringLayer, GeoJSONLayer } from "./layers";
import { useTranslations } from "next-intl";
import { MapPageParams } from "@/types/components/map";
import { useMapStore } from "@/stores";
import { SearchCoordinatesTool } from "@/components/modules/map/tools/SearchCoordinatesTool";
import { buildParamsFromRecord } from "@/utils/params";
import { getMap } from "@/services";


type Props = {
  center?: LatLng;
  zoom?: number;
  filters?: MapPageParams;
  markerVisibilityMinimumZoomThreshold?: number;
  areaVisibilityMinimumZoomThreshold?: number;
  user?: User;
};

const DynamicMap = ({
  center = new LatLng(50.4663775681885, 30.583190917968754),
  zoom = 5,
  user,
  filters,
}: Props) => {
  const t = useTranslations("Modules");
  const {
    isChoosingPlace,
    isChoosingArea,
    isRulerActive,
    isCoordinatesVisible,
    toggleChoosingPlace,
    toggleChoosingArea,
    updateCurrentMapMeasures,
    loadMapMeasures,
    setLastRightClickCoordinates,
    toggleSearchBar,
    toggleLayersBar,
    currentSecondaryLayers,
    currentPrimaryLayer,
    removeTooltip,
    loadLastLayers,
  } = useMapStore();
  const [map, setMap] = useState<LeafletMap | null>(null);
  const areaChoosingToolRef = useRef<AreaChoosingToolHandle>(null);
  const placeChoosingToolRef = useRef<PlaceChoosingToolHandle>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [geoJSON, setGeoJSON] = useState<GeoJSON.FeatureCollection | undefined>();

  useEffect(() => {
    loadLastLayers();
  }, []);

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
    if (searchParams.get(QUERIES.FILTER_SELECTED_POINT)) {
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
      const { success, ...response } = await getMap(filters);
      setGeoJSON(response as GeoJSON.FeatureCollection);
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
      const params = new URLSearchParams(searchParams);
      params.set(
        QUERIES.FILTER_SELECTED_POINT,
        `${position.coords.latitude},${position.coords.longitude}`,
      );
      router.push(`?${params}`);
    });
  }, [map]);

  const handleSave = () => {
    const params = new URLSearchParams(searchParams);

    if (!user) {
      params.set(QUERIES.MODAL_SIGNIN, "true");
      router.push(`?${params}`, { scroll: false });
      return;
    }

    if (isChoosingPlace && placeChoosingToolRef.current) {
      toggleChoosingPlace(false);
      removeTooltip(PLACEHOLDERS.HINT_PLACE_ADDING);

      const point = placeChoosingToolRef.current.getPoint();

      if (point) {
        params.set(QUERIES.MODAL_PLACE_ADDING, "true");
        params.set(QUERIES.FILTER_SELECTED_POINT, `${point.lat},${point.lng}`);

        router.push(`?${params}`, { scroll: false });
      }
    }

    if (isChoosingArea && areaChoosingToolRef.current) {
      toggleChoosingArea(false);
      removeTooltip(PLACEHOLDERS.HINT_AREA_ADDING);

      const points = areaChoosingToolRef.current.getPoints();

      if (points) {
        params.set(QUERIES.MODAL_AREA_ADDING, "true");
        params.set("points", points.map((point) => `${point.lat},${point.lng}`).join(";"));

        router.push(`?${params}`, { scroll: false });
      }
    }
  };

  const handlePlaceSelect = useCallback(
    (id: number) => {
      const params = buildParamsFromRecord(
        { [QUERIES.SHEET_PLACE]: String(id), point: "" },
        searchParams,
      );

      router.push(`${PAGES.MAP}?${params}`, { scroll: false });
    },
    [searchParams],
  );

  const handleAreaSelect = useCallback(
    (id: number) => {
      const params = buildParamsFromRecord(
        { [QUERIES.SHEET_AREA]: String(id), point: "" },
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
      <ContextMenuTrigger
        style={{ height: "100%", width: "100%" }}
        onClick={() => {
          toggleSearchBar(false);
          toggleLayersBar(false);
        }}
      >
        <div className="relative z-50">
          <SearchBar onSearchByCoordinates={handleSearchByCoordinates} />
          <LayersBar layers={Object.values(LAYERS)} />
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
          <ClusteringLayer>
            {geoJSON && <GeoJSONLayer data={geoJSON} onPlaceSelect={handlePlaceSelect} />}
          </ClusteringLayer>
          {/*{isPlacesVisible && (*/}
          {/*  // <ZoomSwitch minZoom={markerVisibilityMinimumZoomThreshold}>*/}
          {/*  <ClusteringLayer>*/}
          {/*    <PlacesLayer places={places} enabledZoomOnClick={true} onSelect={handlePlaceSelect} />*/}
          {/*  </ClusteringLayer>*/}
          {/*  // </ZoomSwitch>*/}
          {/*)}*/}
          {/*{isAreasVisible && (*/}
          {/*  // <ZoomSwitch minZoom={areaVisibilityMinimumZoomThreshold}>*/}
          {/*  <AreasLayer areas={areas} enabledZoomOnClick={true} onSelect={handleAreaSelect} />*/}
          {/*  // </ZoomSwitch>*/}
          {/*)}*/}
          {isCoordinatesVisible && <CoordinatesTool />}
          {isRulerActive && <RulerTool />}
          {isChoosingArea && <AreaChoosingTool ref={areaChoosingToolRef} />}
          {isChoosingPlace && <PlaceChoosingTool ref={placeChoosingToolRef} />}
          <SearchCoordinatesTool />
        </MapContainer>
      </ContextMenuTrigger>
      <MapContextMenu />
      <ToolBar onCenterMap={handleCenterMap} onSavePlace={handleSave} />
    </ContextMenu>
  );
};

export default DynamicMap;
