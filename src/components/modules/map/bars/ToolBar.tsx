"use client";
import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Ban, LocateFixed, MapPin, Move3d, Ruler, Save, Scan, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { ToolBarTooltipsToggle } from "./ToolBarTooltipsToggle";
import { ToolBarTooltipContainer } from "./ToolBarTooltipContainer";
import { useMapStore } from "@/stores";
import { Mobile } from "@/components/common/utils";
import { Tooltip } from "@/components/ui/next/tooltip";
import { PLACEHOLDERS } from "@/config";
import { ClickToast } from "@/components/common/toasts";

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
    toggleRulerActivity,
  } = useMapStore();
  const [isTooltipsExpanded, setIsTooltipsExpanded] = useState(false);

  const handleCancel = useCallback(() => {
    removeTooltip(PLACEHOLDERS.HINT_AREA_ADDING);
    removeTooltip(PLACEHOLDERS.HINT_PLACE_ADDING);
    toggleChoosingArea(false);
    toggleChoosingPlace(false);
  }, []);

  useEffect(() => {
    if (isRulerActive) {
      addTooltip(PLACEHOLDERS.HINT_RULER_TOOL);
    } else {
      removeTooltip(PLACEHOLDERS.HINT_RULER_TOOL);
    }
  }, [isRulerActive]);

  useEffect(() => {
    if (isCoordinatesVisible) {
      addTooltip(PLACEHOLDERS.HINT_COORDINATES_TOOL);
    } else {
      removeTooltip(PLACEHOLDERS.HINT_COORDINATES_TOOL);
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
            <Tooltip content={PLACEHOLDERS.TOOLTIP_GET_MY_LOCATION} asChild>
              <Button variant="ghost" onClick={onCenterMap}>
                <LocateFixed />
              </Button>
            </Tooltip>

            <ClickToast
              message={
                isPlacesVisible
                  ? PLACEHOLDERS.TOAST_PLACES_INVISIBLE
                  : PLACEHOLDERS.TOAST_PLACES_VISIBLE
              }
              passthrough
            >
              <Tooltip content={PLACEHOLDERS.TOOLTIP_TOGGLE_MAP_PINS}>
                <Toggle onPressedChange={togglePlacesVisibility} pressed={isPlacesVisible} asChild>
                  <span>
                    <MapPin />
                  </span>
                </Toggle>
              </Tooltip>
            </ClickToast>

            {/*<Toggle pressed={isAreasVisible} onPressedChange={toggleAreasVisibility}>*/}
            {/*  <Scan />*/}
            {/*</Toggle>*/}

            <ClickToast
              message={
                isCoordinatesVisible
                  ? PLACEHOLDERS.TOAST_COORDINATES_DISABLED
                  : PLACEHOLDERS.TOAST_COORDINATES_ENABLED
              }
              passthrough
            >
              <Tooltip content={PLACEHOLDERS.TOOLTIP_TOGGLE_COORDINATES}>
                <Toggle
                  onPressedChange={toggleCoordinatesVisibility}
                  pressed={isCoordinatesVisible}
                  asChild
                >
                  <span>
                    <Move3d />
                  </span>
                </Toggle>
              </Tooltip>
            </ClickToast>

            <ClickToast
              message={
                isRulerActive ? PLACEHOLDERS.TOAST_RULER_DISABLED : PLACEHOLDERS.TOAST_RULER_ENABLED
              }
              passthrough
            >
              <Tooltip content={PLACEHOLDERS.TOOLTIP_TOGGLE_RULER}>
                <Toggle onPressedChange={toggleRulerActivity} pressed={isRulerActive} asChild>
                  <span>
                    <Ruler />
                  </span>
                </Toggle>
              </Tooltip>
            </ClickToast>
          </div>

          {(isChoosingArea || isChoosingPlace) && (
            <div className="flex flex-col gap-1 border-t border-white/20 pt-1 md:flex-row md:border-t-0 md:border-l md:pl-1">
              <Button variant="ghost" size="sm" onClick={onSave}>
                <Save /> {PLACEHOLDERS.BUTTON_SAVE}
              </Button>
              <Button variant="destructive" size="sm" onClick={handleCancel}>
                <Ban /> {PLACEHOLDERS.BUTTON_CANCEL}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
