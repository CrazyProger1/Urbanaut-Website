import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MapLayer } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { LAYERS, PLACEHOLDERS } from "@/config";
import { useMapStore } from "@/stores";
import { StopPropagation } from "@/components/common/modals";
import { Tooltip } from "@/components/ui/next/tooltip";
import { useTranslations } from "next-intl";

type Props = {
  layers: MapLayer[];
};

export const LayersBar = ({ layers }: Props) => {
  const t = useTranslations("Modules");
  const {
    isLayersBarOpen,
    toggleLayersBar,
    currentSecondaryLayers,
    currentPrimaryLayer,
    setPrimaryLayer,
    toggleSecondaryLayer,
  } = useMapStore();

  return (
    <StopPropagation className="absolute top-4 right-4 flex flex-col">
      <div className="flex flex-col items-end">
        <Card className="bg-background/80 items-center rounded-2xl px-2 py-1 shadow-lg backdrop-blur-sm">
          <Tooltip content={t(PLACEHOLDERS.TOOLTIP_TOGGLE_LAYERS)} asChild>
            <Toggle pressed={isLayersBarOpen} onPressedChange={toggleLayersBar}>
              <Layers />
            </Toggle>
          </Tooltip>
        </Card>
      </div>
      {isLayersBarOpen && (
        <Card className="bg-background/80 mt-4 w-full rounded-2xl shadow-lg backdrop-blur-sm">
          <CardContent className="flex flex-col gap-2">
            <RadioGroup
              defaultValue={currentPrimaryLayer?.value || "OSM"}
              onValueChange={(value) => {
                setPrimaryLayer(layers.filter((layer) => layer.value === value)[0]);
              }}
            >
              {layers
                .filter((layer) => layer.primary)
                .map((layer) => (
                  <div key={layer.value} className="flex items-center gap-3">
                    <RadioGroupItem value={layer.value} id={`r-${layer.value}`} />
                    <Label htmlFor={`r-${layer.value}`}>{layer.label}</Label>
                  </div>
                ))}
            </RadioGroup>
            <Separator />
            <div className="flex flex-col gap-3">
              {layers
                .filter((layer) => !layer.primary)
                .map((layer) => (
                  <div key={layer.value} className="flex items-center gap-3">
                    <Checkbox
                      defaultChecked={!!currentSecondaryLayers.find((l) => l.value === layer.value)}
                      onCheckedChange={(state) => toggleSecondaryLayer(layer, !!state)}
                      value={layer.value}
                      id={`c-${layer.value}`}
                    />
                    <Label htmlFor={`c-${layer.value}`}>{layer.label}</Label>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </StopPropagation>
  );
};
