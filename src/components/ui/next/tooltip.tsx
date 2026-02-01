import { ReactNode } from "react";
import { TooltipTrigger, TooltipContent, Tooltip as ShadcnTooltip } from "@/components/ui/tooltip";

type Props = {
  children?: ReactNode;
  content?: ReactNode;
};

export const Tooltip = ({ children, content }: Props) => {
  return (
    <ShadcnTooltip delayDuration={500}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </ShadcnTooltip>
  );
};
