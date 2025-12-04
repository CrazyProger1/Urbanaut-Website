import { create } from "zustand/react";

type MapState = {
  isPlacesVisible: boolean;
  isAreasVisible: boolean;
};

type MapDispatch = {
  toggleAreasVisibility: (visible?: boolean) => void;
  togglePlacesVisibility: (visible?: boolean) => void;
};

export const useMapStore = create<MapState & MapDispatch>((set, get) => ({
  isAreasVisible: true,
  isPlacesVisible: true,

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
}));
