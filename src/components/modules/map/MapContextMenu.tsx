"use client";

import React from "react";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { Hash, Plus } from "lucide-react";
import { useMapStore } from "@/stores";
import { PLACEHOLDERS } from "@/config";
import { useTranslations } from "next-intl";

type Props = {
  onCopyCoordinates?: () => void;
};

const MapContextMenu = ({ onCopyCoordinates }: Props) => {
  const t = useTranslations("Modules");
  const { toggleChoosingPlace, addTooltip } = useMapStore();

  return (
    <ContextMenuContent>
      <ContextMenuItem
        onClick={() => {
          toggleChoosingPlace(true);
          addTooltip(PLACEHOLDERS.HINT_PLACE_ADDING);
        }}
      >
        <Plus /> {t(PLACEHOLDERS.LABEL_PLACE)}{" "}
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
      <ContextMenuItem onClick={onCopyCoordinates}>
        <Hash />
        {t(PLACEHOLDERS.BUTTON_COORDINATES)}
      </ContextMenuItem>
    </ContextMenuContent>
  );
};

export default MapContextMenu;
