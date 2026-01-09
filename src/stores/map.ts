import { create } from "zustand/react";
import { LatLngBounds, LatLng, bounds } from "leaflet";

type MapState = {
  isPlacesVisible: boolean;
  isAreasVisible: boolean;
  isChoosingArea: boolean;
  isChoosingPlace: boolean;
  isCoordinatesVisible: boolean;
  isRulerActive: boolean;
  tooltips: string[];
  currentMapBounds?: LatLngBounds;
  currentMapCenter?: LatLng;
  currentMapZoom?: number;
};

type MapDispatch = {
  toggleAreasVisibility: (visible?: boolean) => void;
  togglePlacesVisibility: (visible?: boolean) => void;
  toggleChoosingArea: (choosing?: boolean) => void;
  toggleChoosingPlace: (choosing?: boolean) => void;
  toggleCoordinatesVisibility: (visible?: boolean) => void;
  toggleRulerActivity: (active?: boolean) => void;
  addTooltip: (text: string) => void;
  removeTooltip: (text: string) => void;
  clearTooltips: () => void;
  setCurrentMapBounds: (bounds: LatLngBounds) => void;
  setCurrentMapCenter: (center: LatLng) => void;
  setCurrentMapZoom: (zoom: number) => void;
  updateCurrentMapMeasures: (bounds?: LatLngBounds, center?: LatLng, zoom?: number) => void;
  loadMapMeasures: () => { center: LatLng; zoom: number; bounds: LatLngBounds } | undefined;
};

export const useMapStore = create<MapState & MapDispatch>((set, get) => ({
  isAreasVisible: true,
  isPlacesVisible: true,
  isChoosingArea: false,
  isChoosingPlace: false,
  isCoordinatesVisible: false,
  isRulerActive: false,
  tooltips: [],

  toggleAreasVisibility: (visible) => {
    if (visible === undefined) {
      visible = !get().isAreasVisible;
    }
    set({ isAreasVisible: visible });
  },

  togglePlacesVisibility: (visible) => {
    if (visible === undefined) {
      visible = !get().isPlacesVisible;
    }
    set({ isPlacesVisible: visible });
  },
  toggleChoosingArea: (choosing) => {
    if (choosing === undefined) {
      choosing = !get().isChoosingArea;
    }
    set({ isChoosingArea: choosing });
  },
  toggleChoosingPlace: (choosing) => {
    if (choosing === undefined) {
      choosing = !get().isChoosingPlace;
    }
    set({ isChoosingPlace: choosing });
  },
  toggleCoordinatesVisibility: (visible) => {
    if (visible === undefined) {
      visible = !get().isCoordinatesVisible;
    }
    set({ isCoordinatesVisible: visible });
  },
  toggleRulerActivity: (active) => {
    if (active === undefined) {
      active = !get().isRulerActive;
    }
    set({ isRulerActive: active });
  },
  addTooltip: (text) => {
    const currentTooltips = get().tooltips;

    if (!currentTooltips.includes(text)) {
      set({ tooltips: [text, ...currentTooltips] });
    }
  },
  removeTooltip: (text) => {
    const currentTooltips = get().tooltips;
    set({ tooltips: currentTooltips.filter((t) => t !== text) });
  },
  clearTooltips: () => {
    set({ tooltips: [] });
  },
  setCurrentMapBounds: (bounds) => {
    set({ currentMapBounds: bounds });
  },
  setCurrentMapCenter: (center: LatLng) => {
    set({ currentMapCenter: center });
  },
  setCurrentMapZoom: (zoom: number) => {
    set({ currentMapZoom: zoom });
  },
  updateCurrentMapMeasures: (bounds, center, zoom) => {
    set({ currentMapCenter: center, currentMapBounds: bounds, currentMapZoom: zoom });
    localStorage.setItem(
      "map",
      JSON.stringify({
        bounds,
        center,
        zoom,
      }),
    );
  },
  loadMapMeasures: () => {
    const measures = localStorage.getItem("map");

    if (measures) {
      const { bounds, center, zoom } = JSON.parse(measures);
      if (bounds && center && zoom) {
        set({ currentMapCenter: center, currentMapBounds: bounds, currentMapZoom: zoom });

        return {
          bounds,
          center,
          zoom,
        };
      }
    }
  },
}));
