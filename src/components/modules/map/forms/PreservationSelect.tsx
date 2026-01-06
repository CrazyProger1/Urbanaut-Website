"use client";

import React from "react";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPreservationColorClass } from "@/utils/css";
import { APIPreservationLevel } from "@/types";

type Props = {
  value?: APIPreservationLevel;
  onChange: (value: APIPreservationLevel) => void;
};

export const PreservationSelect = ({ value, onChange }: Props) => {
  const PRESERVATION_LABELS: Record<APIPreservationLevel, string> = {
    NONE: "No preservation",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    AWESOME: "Awesome",
  };

  const PRESERVATION_DESCRIPTIONS: Record<APIPreservationLevel, string> = {
    NONE: "Object is mostly ruined; only fragments remain.",
    LOW: "Partially destroyed; roof or walls may be missing.",
    MEDIUM: "Main structure intact; some interiors damaged.",
    HIGH: "Buildings mostly preserved; minor damage.",
    AWESOME: "Almost untouched; interiors and details intact.",
  };

  return (
    <>
      <FormControl>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className={`w-full ${getPreservationColorClass(value)}`}>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(PRESERVATION_LABELS) as APIPreservationLevel[]).map((key) => (
              <SelectItem key={key} value={key} className={getPreservationColorClass(key)}>
                {PRESERVATION_LABELS[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <p className="text-muted-foreground text-sm">{PRESERVATION_DESCRIPTIONS[value || "MEDIUM"]}</p>
      <FormMessage />
    </>
  );
};
