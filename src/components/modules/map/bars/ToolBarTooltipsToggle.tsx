import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  value: boolean;
  onToggle: (value: boolean) => void;
};

export const ToolBarTooltipsToggle = ({ value, onToggle }: Props) => {
  return (
    <div>
      {value ? (
        <ChevronDown onClick={() => onToggle(!value)} />
      ) : (
        <ChevronUp onClick={() => onToggle(!value)} />
      )}
    </div>
  );
};
