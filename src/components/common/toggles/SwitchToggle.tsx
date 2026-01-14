import React, { ReactNode } from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import * as SwitchPrimitive from "@radix-ui/react-switch";

type Props = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  icon?: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  switchClassName?: string;
};

export const SwitchToggle = (props: Props) => {
  const { icon, title, description, className, switchClassName, ...rest } = props;

  const actualClassName = cn(
    "border-border hover:bg-accent/50 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-primary/50 flex items-center justify-between rounded-lg border p-3 transition-colors",
    className,
  );

  return (
    <Label className={actualClassName}>
      <div className="flex items-center gap-3">
        {icon}
        <div className="font-normal">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      <Switch className={switchClassName} {...rest} />
    </Label>
  );
};
