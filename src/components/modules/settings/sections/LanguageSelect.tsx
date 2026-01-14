"use client";

import React from "react";
import { SearchableSelect } from "@/components/common/selects";

type Props = {
  value?: string;
  languages?: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

export const LanguageSelect = ({ value, languages, onChange, disabled }: Props) => {
  return (
    <SearchableSelect
      selectText="Select language"
      searchPlaceholder="Search language..."
      options={languages}
      onChange={onChange}
      disabled={disabled}
      value={value}
    />
  );
};
