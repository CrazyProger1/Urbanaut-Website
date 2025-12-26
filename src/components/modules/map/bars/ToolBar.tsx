"use client";
import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Ban, LocateFixed, MapPin, Move3d, Ruler, Save, Scan } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { ToolBarTooltipsToggle } from "./ToolBarTooltipsToggle";
import { ToolBarTooltipContainer } from "./ToolBarTooltipContainer";
import { useMapStore } from "@/stores";

type Props = {
  onCenterMap?: () => void;
  onSavePlace?: () => void;
};

export const ToolBar = ({ onCenterMap, onSavePlace: onSave }: Props) => {
  const {
    tooltips,
    isAreasVisible,
    isCoordinatesVisible,
    isPlacesVisible,
    isChoosingPlace,
    isChoosingArea,
    isRulerActive,
    addTooltip,
    removeTooltip,
    toggleChoosingArea,
    toggleChoosingPlace,
    toggleCoordinatesVisibility,
    togglePlacesVisibility,
    toggleAreasVisibility,
    toggleRulerActivity,
  } = useMapStore();
  const [isTooltipsExpanded, setIsTooltipsExpanded] = useState(false);

  const handleCancel = useCallback(() => {
    toggleChoosingArea(false);
    toggleChoosingPlace(false);
  }, []);

  useEffect(() => {
    if (isRulerActive) {
      addTooltip("Build your route and measure the distance by tapping any point on the map.");
    } else {
      removeTooltip("Build your route and measure the distance by tapping any point on the map.");
    }
  }, [isRulerActive]);

  useEffect(() => {
    if (isCoordinatesVisible) {
      addTooltip("Tap any point on the map to determine the coordinates.");
    } else {
      removeTooltip("Tap any point on the map to determine the coordinates.");
    }
  }, [isCoordinatesVisible])

  return (
    <div className={cn("absolute bottom-4 left-1/2 -translate-x-1/2")}>
      <Card
        className={cn(
          "px-2 py-1 shadow-lg",
          tooltips && tooltips.length > 0 && "pt-0",
          "bg-background/80 flex max-w-fit flex-col items-center gap-0 rounded-2xl backdrop-blur-sm",
        )}
      >
        {tooltips && tooltips.length > 0 && (
          <div className="flex flex-col items-center pb-1">
            <ToolBarTooltipsToggle value={isTooltipsExpanded} onToggle={setIsTooltipsExpanded} />
            {isTooltipsExpanded && <ToolBarTooltipContainer tooltips={tooltips} />}
          </div>
        )}

        <div className="flex flex-row gap-1">
          <Button variant="ghost" onClick={onCenterMap}>
            <LocateFixed />
          </Button>

          <Toggle pressed={isPlacesVisible} onPressedChange={togglePlacesVisibility}>
            <MapPin />
          </Toggle>

          <Toggle pressed={isAreasVisible} onPressedChange={toggleAreasVisibility}>
            <Scan />
          </Toggle>

          <Toggle pressed={isCoordinatesVisible} onPressedChange={toggleCoordinatesVisibility}>
            <Move3d />
          </Toggle>

          <Toggle pressed={isRulerActive} onPressedChange={toggleRulerActivity}>
            <Ruler />
          </Toggle>

          {(isChoosingArea || isChoosingPlace) && (
            <>
              <div className="mx-1 h-5 w-px bg-white/20" />
              <Button variant="ghost" size="sm" onClick={onSave}>
                <Save /> Save
              </Button>
              <Button variant="destructive" size="sm" onClick={handleCancel}>
                <Ban /> Cancel
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};
