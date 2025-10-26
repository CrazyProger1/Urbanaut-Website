import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { Ban, LocateFixed, MapPin, Move3d, Ruler, Save, Scan } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";

type Props = {
  showSaveControls?: boolean;
  onTogglePlacesVisible?: () => void;
  onToggleAreasVisible?: () => void;
  onToggleCoordinatesVisible?: () => void;
  onToggleRulerActive?: () => void;
  isPlacesVisible?: boolean;
  isAreasVisible?: boolean;
  isCoordinatesVisible?: boolean;
  isRulerActive?: boolean;
  onCenterMap?: () => void;
  onSavePlace?: () => void;
  onCancel?: () => void;
};

export const ToolBar = ({
  showSaveControls,
  onTogglePlacesVisible,
  onToggleAreasVisible,
  onToggleCoordinatesVisible,
  onToggleRulerActive,
  isPlacesVisible,
  isAreasVisible,
  isCoordinatesVisible,
  isRulerActive,
  onCenterMap,
  onSavePlace: onSave,
  onCancel,
}: Props) => {
  return (
    <Card
      className={cn(
        "absolute bottom-4 left-1/2 -translate-x-1/2",
        "bg-background/80 flex flex-row items-center gap-1 rounded-2xl backdrop-blur-sm",
        "px-2 py-1 shadow-lg",
      )}
    >
      <Button variant="ghost" onClick={onCenterMap}>
        <LocateFixed />
      </Button>

      <Toggle pressed={isPlacesVisible} onPressedChange={onTogglePlacesVisible}>
        <MapPin />
      </Toggle>

      <Toggle pressed={isAreasVisible} onPressedChange={onToggleAreasVisible}>
        <Scan />
      </Toggle>

      <Toggle pressed={isCoordinatesVisible} onPressedChange={onToggleCoordinatesVisible}>
        <Move3d />
      </Toggle>

      <Toggle pressed={isRulerActive} onPressedChange={onToggleRulerActive}>
        <Ruler />
      </Toggle>

      {showSaveControls && (
        <>
          <div className="mx-1 h-5 w-px bg-white/20" />
          <Button variant="ghost" size="sm" onClick={onSave}>
            <Save /> Save
          </Button>
          <Button variant="destructive" size="sm" onClick={onCancel}>
            <Ban /> Cancel
          </Button>
        </>
      )}
    </Card>
  );
};
