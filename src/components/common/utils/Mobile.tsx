import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children?: ReactNode;
  className?: string;
};

export const Mobile = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "md:hidden lg:hidden xl:hidden",

        className,
      )}
    >
      {children}
    </div>
  );
};
