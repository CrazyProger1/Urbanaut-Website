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
import { getPreservationColorClass, getSecurityColorClass } from "@/utils/classes";
import { SecurityLevel } from "@/types";

type Props = {
  value?: SecurityLevel;
  onChange: (value: SecurityLevel) => void;
};

export const SecuritySelect = ({ value, onChange }: Props) => {
  const SECURITY_LABELS: Record<SecurityLevel, string> = {
    NONE: "None",
    EASY: "Easy",
    MEDIUM: "Medium",
    HARD: "Hard",
    IMPOSSIBLE: "Impossible",
  };

  const SECURITY_DESCRIPTIONS: Record<SecurityLevel, string> = {
    NONE: "No security - anyone can enter without any effort.",
    EASY: "Very low security - basic locks, easily bypassed or forced.",
    MEDIUM: "Moderate security - standard locks, alarms, some physical barriers.",
    HARD: "High security - reinforced doors/windows, good alarms, cameras, difficult to breach.",
    IMPOSSIBLE:
      "Extremely secure - heavy fortifications, advanced systems, almost no realistic chance of unauthorized entry.",
  };

  return (
    <>
      <FormControl>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className={`w-full ${getSecurityColorClass(value)}`}>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(SECURITY_LABELS) as SecurityLevel[]).map((key) => (
              <SelectItem key={key} value={key} className={getSecurityColorClass(key)}>
                {SECURITY_LABELS[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <p className="text-muted-foreground text-sm">{SECURITY_DESCRIPTIONS[value || "MEDIUM"]}</p>
      <FormMessage />
    </>
  );
};
