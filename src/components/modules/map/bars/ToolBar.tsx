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
import { Mobile } from "@/components/common/utils";
import { Tooltip } from "@/components/ui/next/tooltip";
import { PLACEHOLDERS } from "@/config";

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
  }, [isCoordinatesVisible]);

  return (
    <div className={cn("absolute bottom-4 left-1/2 -translate-x-1/2")}>
      <Card
        className={cn(
          "px-2 py-1 shadow-lg",
          "bg-background/80 flex max-w-fit flex-col items-center gap-0 rounded-2xl backdrop-blur-sm",
        )}
      >
        <Mobile className="min-w-full">
          {tooltips && tooltips.length > 0 && (
            <div className="flex w-0 min-w-full flex-col pb-1">
              <ToolBarTooltipsToggle value={isTooltipsExpanded} onToggle={setIsTooltipsExpanded} />
              {isTooltipsExpanded && <ToolBarTooltipContainer tooltips={tooltips} />}
            </div>
          )}
        </Mobile>
        <div className="flex flex-col gap-1 md:flex-row">
          <div className="flex flex-row gap-1">
            <Tooltip content={PLACEHOLDERS.TOOLTIP_GET_MY_LOCATION}>
              <Button variant="ghost" onClick={onCenterMap}>
                <LocateFixed />
              </Button>
            </Tooltip>

            <Tooltip content={PLACEHOLDERS.TOOLTIP_TOGGLE_MAP_PINS}>
              <Toggle pressed={isPlacesVisible} onPressedChange={togglePlacesVisibility}>
                <MapPin />
              </Toggle>
            </Tooltip>

            {/*<Toggle pressed={isAreasVisible} onPressedChange={toggleAreasVisibility}>*/}
            {/*  <Scan />*/}
            {/*</Toggle>*/}

            <Tooltip content={PLACEHOLDERS.TOOLTIP_TOGGLE_COORDINATES}>
              <Toggle pressed={isCoordinatesVisible} onPressedChange={toggleCoordinatesVisibility}>
                <Move3d />
              </Toggle>
            </Tooltip>

            <Tooltip content={PLACEHOLDERS.TOOLTIP_TOGGLE_RULER}>
              <Toggle pressed={isRulerActive} onPressedChange={toggleRulerActivity}>
                <Ruler />
              </Toggle>
            </Tooltip>
          </div>

          {(isChoosingArea || isChoosingPlace) && (
            <div className="flex flex-col gap-1 border-t border-white/20 pt-1 md:flex-row md:border-t-0 md:border-l md:pl-1">
              <Button variant="ghost" size="sm" onClick={onSave}>
                <Save /> Save
              </Button>
              <Button variant="destructive" size="sm" onClick={handleCancel}>
                <Ban /> Cancel
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
