"use client";

import React from "react";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { Plus } from "lucide-react";
import { useMapStore } from "@/stores";
import { PLACEHOLDERS } from "@/config";

type Props = {
  onCopyCoordinates?: () => void;
};

const MapContextMenu = ({ onCopyCoordinates }: Props) => {
  const { toggleChoosingPlace, toggleChoosingArea, addTooltip } = useMapStore();

  return (
    <ContextMenuContent>
      <ContextMenuItem
        onClick={() => {
          toggleChoosingPlace(true);
          addTooltip(PLACEHOLDERS.PLACE_ADDING_TOOLTIP);
        }}
      >
        <Plus /> Place{" "}
      </ContextMenuItem>
      {/*<ContextMenuItem*/}
      {/*  onClick={() => {*/}
      {/*    toggleChoosingArea(true);*/}
      {/*    addTooltip(PLACEHOLDERS.AREA_ADDING_TOOLTIP);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Plus /> Area{" "}*/}
      {/*</ContextMenuItem>*/}
      <ContextMenuSeparator />
      <ContextMenuItem onClick={onCopyCoordinates}>Coordinates</ContextMenuItem>
    </ContextMenuContent>
  );
};

export default MapContextMenu;
