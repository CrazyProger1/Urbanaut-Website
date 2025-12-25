"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Ban,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  LocateFixed,
  MapPin,
  Move3d,
  Ruler,
  Save,
  Scan,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";
import { AnimatePresence , motion} from "framer-motion";

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
  tooltip?: string;
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
  tooltip,
  onCenterMap,
  onSavePlace: onSave,
  onCancel,
}: Props) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className={cn("absolute bottom-4 left-1/2 -translate-x-1/2")}>
      {/*<div className="text-sm text-black">{tooltip}</div>*/}

      <Card
        className={cn(
          "px-2 pt-0 pb-1 shadow-lg",
          "bg-background/80 flex max-w-fit flex-col items-center gap-1 rounded-2xl backdrop-blur-sm",
        )}
      >
        {isTooltipVisible ? (
          <ChevronDown onClick={() => setIsTooltipVisible(false)} />
        ) : (
          <ChevronUp onClick={() => setIsTooltipVisible(true)} />
        )}

        <AnimatePresence>
          {tooltip && isTooltipVisible && (
            <motion.div
              initial={{
                opacity: 0,
                y: -8, // Чуть выше
                scaleY: 0.8, // Сжат по высоте
                transformOrigin: "top", // Важно! Раскрывается от верхнего края
              }}
              animate={{
                opacity: 1,
                y: 0,
                scaleY: 1,
              }}
              exit={{
                opacity: 0,
                y: -8,
                scaleY: 0.8,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="flex border-spacing-1 flex-row items-center gap-2 border-y"
            >
              <div className="flex-shrink-0">
                <CircleAlert />
              </div>
              <div className="flex max-w-fit flex-col items-center rounded-2xl pb-1 text-sm">
                {tooltip}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-row gap-1">
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
        </div>
      </Card>
    </div>
  );
};
