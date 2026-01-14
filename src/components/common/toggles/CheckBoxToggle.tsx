import React, { FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

type Props = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  icon?: React.ReactNode;
  className?: string;
  checkBoxClassName?: string;
  title: string;
  description?: string;
};

export const CheckBoxToggle = (props: Props) => {
  const { icon, className, checkBoxClassName, title, description, ...rest } = props;

  const actualClassName = cn(
    "border-border hover:bg-accent/50 group has-[[aria-checked=true]]:border-primary/50 has-[[aria-checked=true]]:bg-primary/50 has-[[aria-checked=true]]:text-black flex items-center justify-between rounded-lg border p-3 transition-colors",
    className,
  );
  const actualCheckBoxClassName = cn(
    "data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700",
    checkBoxClassName,
  );

  return (
    <Label className={actualClassName}>
      <div className="flex items-center gap-3">
        {icon}
        <div className="font-normal">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-muted-foreground text-sm group-has-aria-checked:text-black transition-colors">{description}</p>
        </div>
      </div>
      <Checkbox {...rest} className={actualCheckBoxClassName} />
    </Label>
  );
};
