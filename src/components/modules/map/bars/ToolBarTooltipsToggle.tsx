import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  value: boolean;
  onToggle: (value: boolean) => void;
};

export const ToolBarTooltipsToggle = ({ value, onToggle }: Props) => {
  return <div className="w-full flex flex-col items-center" onClick={() => onToggle(!value)}>{value ? <ChevronDown /> : <ChevronUp />}</div>;
};
