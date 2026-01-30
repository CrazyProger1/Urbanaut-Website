import React from "react";

import { AnimatePresence } from "framer-motion";
import { Motion } from "@/components/lib/motion";
import { ToolBarTooltip } from "./ToolBarTooltip";

type Props = {
  tooltips?: string[];
};

export const ToolBarTooltipContainer = ({ tooltips }: Props) => {
  return (
    <AnimatePresence>
      {tooltips && (
        <Motion
          initial={{
            opacity: 0,
            y: -8,
            scaleY: 0.8,
            transformOrigin: "top",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scaleY: 1,
          }}
          exit={{
            opacity: 0,
            y: -8,
            scaleY: 0.8,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="flex flex-col min-w-full"
        >
          {tooltips.map((tooltip) => (
            <ToolBarTooltip key={tooltip} tooltip={tooltip} />
          ))}
        </Motion>
      )}
    </AnimatePresence>
  );
};
