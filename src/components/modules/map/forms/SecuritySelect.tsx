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
import { getSecurityColorClass } from "@/utils/classes";
import { SecurityLevel } from "@/types";
import { PLACEHOLDERS } from "@/config";

type Props = {
  value?: SecurityLevel;
  onChange: (value: SecurityLevel) => void;
};

const SECURITY_LEVELS: SecurityLevel[] = ["NONE", "EASY", "MEDIUM", "HARD", "IMPOSSIBLE"];

const SECURITY_LABEL_KEYS: Record<SecurityLevel, string> = {
  NONE: PLACEHOLDERS.LABEL_SECURITY_NONE,
  EASY: PLACEHOLDERS.LABEL_SECURITY_EASY,
  MEDIUM: PLACEHOLDERS.LABEL_SECURITY_MEDIUM,
  HARD: PLACEHOLDERS.LABEL_SECURITY_HARD,
  IMPOSSIBLE: PLACEHOLDERS.LABEL_SECURITY_IMPOSSIBLE,
};

const SECURITY_DESCRIPTION_KEYS: Record<SecurityLevel, string> = {
  NONE: PLACEHOLDERS.DESCRIPTION_SECURITY_NONE,
  EASY: PLACEHOLDERS.DESCRIPTION_SECURITY_EASY,
  MEDIUM: PLACEHOLDERS.DESCRIPTION_SECURITY_MEDIUM,
  HARD: PLACEHOLDERS.DESCRIPTION_SECURITY_HARD,
  IMPOSSIBLE: PLACEHOLDERS.DESCRIPTION_SECURITY_IMPOSSIBLE,
};

export const SecuritySelect = ({ value, onChange }: Props) => {
  const t = useTranslations("Modules");

  return (
    <>
      <FormControl>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className={`w-full `}>
            <SelectValue placeholder={t(PLACEHOLDERS.LABEL_SELECT_LEVEL)} />
          </SelectTrigger>
          <SelectContent>
            {SECURITY_LEVELS.map((key) => (
              <SelectItem key={key} value={key} className={getSecurityColorClass(key)}>
                {t(SECURITY_LABEL_KEYS[key])}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <p className="text-muted-foreground text-sm">
        {t(SECURITY_DESCRIPTION_KEYS[value || "MEDIUM"])}
      </p>
    </>
  );
};
