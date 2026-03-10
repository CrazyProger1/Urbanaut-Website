"use client";

import React, { useCallback } from "react";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { Binoculars, Earth, Hash, Map, Plus } from "lucide-react";
import { useMapStore } from "@/stores";
import { PLACEHOLDERS } from "@/config";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { setClipboard } from "@/utils/clipboard";
import { Link } from "@/i18n";
import { useMapProviderLinks } from "@/hooks";

const MapContextMenu = () => {
  const t = useTranslations("Modules");
  const { toggleChoosingPlace, addTooltip, lastRightClickCoordinates, currentMapZoom } = useMapStore();

  const handleCopyCoordinates = useCallback(async () => {
    toast.success(t(PLACEHOLDERS.TOAST_COPIED_INTO_CLIPBOARD));
    if (lastRightClickCoordinates) {
      await setClipboard(`${lastRightClickCoordinates?.lat}, ${lastRightClickCoordinates?.lng}`);
    }
  }, [lastRightClickCoordinates]);

  const providers = useMapProviderLinks(
    [lastRightClickCoordinates?.lat || 0, lastRightClickCoordinates?.lng || 0],
    currentMapZoom,
  );

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
      <ContextMenuSeparator />
      <ContextMenuItem onClick={handleCopyCoordinates}>
        <Hash />
        {t(PLACEHOLDERS.BUTTON_COORDINATES)}
      </ContextMenuItem>
      <ContextMenuSeparator />
      {providers.map(({ type, link, name }) => (
        <ContextMenuItem asChild key={link}>
          <Link href={link} target="_blank">
            {type === "map" && <Map />}
            {type === "map3d" && <Earth />}
            {type === "streetview" && <Binoculars />}
            {name}
          </Link>
        </ContextMenuItem>
      ))}
    </ContextMenuContent>
  );
};

export default MapContextMenu;
