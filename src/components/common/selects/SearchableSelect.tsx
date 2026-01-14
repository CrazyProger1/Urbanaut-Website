"use client";

import React, { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type Props = {
  value?: string;
  options?: string[];
  disabled?: boolean;
  searchPlaceholder?: string;
  selectText?: string;
  notFoundText?: string;
  onChange?: (value: string) => void;
  onSearch?: (term: string) => void;
  pagination?: boolean;
  limit?: number;
  onLoadMore?: () => void;
};

export const SearchableSelect = ({
  value,
  options,
  disabled,
  searchPlaceholder,
  selectText,
  notFoundText,
  onChange,
  pagination,
  limit,
  onSearch,
  onLoadMore,
}: Props) => {
  const [open, setOpen] = useState(false);

  const length = useMemo(() => {
    return options?.length;
  }, [options]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", !value && "text-muted-foreground")}
        >
          {value || selectText}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            onValueChange={(term) => onSearch?.(term)}
          />
          <CommandList>
            <CommandEmpty>{notFoundText}</CommandEmpty>
            <CommandGroup>
              {options?.map((option, index) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    onChange?.(option);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn("mr-2 h-4 w-4", value === option ? "opacity-100" : "opacity-0")}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
