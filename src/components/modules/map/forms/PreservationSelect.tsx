"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPreservationColorClass } from "@/utils/classes";
import { PreservationLevel } from "@/types";
import { PLACEHOLDERS } from "@/config";

type Props = {
  value?: PreservationLevel;
  onChange: (value: PreservationLevel) => void;
};

const PRESERVATION_LEVELS: PreservationLevel[] = ["NONE", "LOW", "MEDIUM", "HIGH", "AWESOME"];

const PRESERVATION_LABEL_KEYS: Record<PreservationLevel, string> = {
  NONE: PLACEHOLDERS.LABEL_PRESERVATION_NONE,
  LOW: PLACEHOLDERS.LABEL_PRESERVATION_LOW,
  MEDIUM: PLACEHOLDERS.LABEL_PRESERVATION_MEDIUM,
  HIGH: PLACEHOLDERS.LABEL_PRESERVATION_HIGH,
  AWESOME: PLACEHOLDERS.LABEL_PRESERVATION_AWESOME,
};

const PRESERVATION_DESCRIPTION_KEYS: Record<PreservationLevel, string> = {
  NONE: PLACEHOLDERS.DESCRIPTION_PRESERVATION_NONE,
  LOW: PLACEHOLDERS.DESCRIPTION_PRESERVATION_LOW,
  MEDIUM: PLACEHOLDERS.DESCRIPTION_PRESERVATION_MEDIUM,
  HIGH: PLACEHOLDERS.DESCRIPTION_PRESERVATION_HIGH,
  AWESOME: PLACEHOLDERS.DESCRIPTION_PRESERVATION_AWESOME,
};

export const PreservationSelect = ({ value, onChange }: Props) => {
  const t = useTranslations("Modules");

  return (
    <>
      <FormControl>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className={`w-full ${getPreservationColorClass(value)}`}>
            <SelectValue placeholder={t(PLACEHOLDERS.LABEL_SELECT_LEVEL)} />
          </SelectTrigger>
          <SelectContent>
            {PRESERVATION_LEVELS.map((key) => (
              <SelectItem key={key} value={key} className={getPreservationColorClass(key)}>
                {t(PRESERVATION_LABEL_KEYS[key])}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <p className="text-muted-foreground text-sm">
        {t(PRESERVATION_DESCRIPTION_KEYS[value || "MEDIUM"])}
      </p>
    </>
  );
};
