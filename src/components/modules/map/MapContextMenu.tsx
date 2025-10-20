"use client";

import React from "react";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { Plus } from "lucide-react";

type Props = {
  onCopyCoordinates?: () => void;
  onAddPlace?: () => void;
  onAddArea?: () => void;
};

const MapContextMenu = ({ onCopyCoordinates, onAddArea, onAddPlace }: Props) => {
  return (
    <ContextMenuContent>
      <ContextMenuItem onClick={onAddPlace}>
        <Plus /> Place{" "}
      </ContextMenuItem>
      <ContextMenuItem onClick={onAddArea}>
        <Plus /> Area{" "}
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem onClick={onCopyCoordinates}>Coordinates</ContextMenuItem>
    </ContextMenuContent>
  );
};

export default MapContextMenu;
