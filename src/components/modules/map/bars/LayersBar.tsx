import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MapLayer } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { LAYERS } from "@/config";
import { useMapStore } from "@/stores";
import { StopPropagation } from "@/components/common/modals";

type Props = {
  layers: MapLayer[];
  defaultPrimary?: MapLayer;
  defaultSecondary?: MapLayer[];
  onPrimaryLayerChange?: (layer: MapLayer) => void;
  onSecondaryLayerToggle: (layer: MapLayer, active: boolean) => void;
};

export const LayersBar = ({
  layers,
  defaultPrimary = LAYERS.OSM,
  defaultSecondary = [],
  onPrimaryLayerChange,
  onSecondaryLayerToggle,
}: Props) => {
  const { isLayersBarOpen, toggleLayersBar } = useMapStore();

  return (
    <StopPropagation className="absolute top-4 right-4 flex flex-col">
      <div className="flex flex-col items-end">
        <Card className="bg-background/80 items-center rounded-2xl px-2 py-1 shadow-lg backdrop-blur-sm">
          <Toggle pressed={isLayersBarOpen} onPressedChange={toggleLayersBar}>
            <Layers />
          </Toggle>
        </Card>
      </div>
      {isLayersBarOpen && (
        <Card className="bg-background/80 mt-4 w-full rounded-2xl shadow-lg backdrop-blur-sm">
          <CardContent className="flex flex-col gap-2">
            <RadioGroup
              defaultValue={defaultPrimary?.value || "OSM"}
              onValueChange={(value) => {
                onPrimaryLayerChange?.(layers.filter((layer) => layer.value === value)[0]);
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
                      defaultChecked={defaultSecondary?.includes(layer)}
                      onCheckedChange={(state) => onSecondaryLayerToggle?.(layer, !!state)}
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
