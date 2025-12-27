import React from "react";
import { CircleAlert } from "lucide-react";

type Props = {
  tooltip: string;
};

export const ToolBarTooltip = ({ tooltip }: Props) => {
  return (
    <div className="flex min-w-full flex-row gap-2 items-center first:border-t border-b p-1 border-white/20">
      <div>
        <CircleAlert />
      </div>
      <div className="flex max-w-fit flex-col items-center rounded-2xl text-sm">{tooltip}</div>
    </div>
  );
};
