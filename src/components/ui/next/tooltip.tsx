import { ReactNode } from "react";
import { TooltipTrigger, TooltipContent, Tooltip as ShadcnTooltip } from "@/components/ui/tooltip";

type Props = {
  children?: ReactNode;
  content?: ReactNode;
  asChild?: boolean;
};

export const Tooltip = ({ children, content, asChild }: Props) => {
  return (
    <ShadcnTooltip delayDuration={500}>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent className="select-none">{content}</TooltipContent>
    </ShadcnTooltip>
  );
};
