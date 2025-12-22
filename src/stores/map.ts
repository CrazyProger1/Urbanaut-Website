import { create } from "zustand/react";

type MapState = {
  isPlacesVisible: boolean;
  isAreasVisible: boolean;
  isChoosingArea: boolean;
  isChoosingPlace: boolean;
  isCoordinatesVisible: boolean;
  isRulerActive: boolean;
};

type MapDispatch = {
  toggleAreasVisibility: (visible?: boolean) => void;
  togglePlacesVisibility: (visible?: boolean) => void;
  toggleChoosingArea: (choosing?: boolean) => void;
  toggleChoosingPlace: (choosing?: boolean) => void;
  toggleCoordinatesVisibility: (visible?: boolean) => void;
  toggleRulerActivity: (active?: boolean) => void;
};

export const useMapStore = create<MapState & MapDispatch>((set, get) => ({
  isAreasVisible: true,
  isPlacesVisible: true,
  isChoosingArea: false,
  isChoosingPlace: false,
  isCoordinatesVisible: false,
  isRulerActive: false,

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
}));
