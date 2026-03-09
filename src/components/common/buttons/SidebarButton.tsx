import { Slot } from "@radix-ui/react-slot";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  asChild?: boolean;
};

export const SidebarButton = ({ children, asChild }: Props) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp className="bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-row items-center gap-2 rounded-sm px-2 py-1.5 text-sm shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]">
      {children}
    </Comp>
  );
};
