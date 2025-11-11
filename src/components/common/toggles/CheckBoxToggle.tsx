import React, { FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

type Props = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  className?: string;
  checkBoxClassName?: string;
  title: string;
  description?: string;
};

export const CheckBoxToggle = (props: Props) => {
  const {className, checkBoxClassName, title, description, ...rest} = props;

  const actualClassName = cn(
    "hover:bg-accent/50 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-primary/50 flex cursor-pointer items-start gap-3 rounded-lg border p-3",
    className,
  );
  const actualCheckBoxClassName = cn(
    "data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700",
    checkBoxClassName,
  );

  return (
    <Label className={actualClassName}>
      <Checkbox
        {...rest}
        className={actualCheckBoxClassName}
      />
      <div className="grid gap-1.5 font-normal">
        <p className="text-sm leading-none font-medium">{title}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </Label>
  );
};
