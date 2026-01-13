"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import { APIListCity } from "@/types/services/api";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  cities: APIListCity[];
  value?: string;
  onLoadMore?: () => void;
  onSearch?: (term: string) => void;
  onChange: (value: string) => void;
};

export const CitySelect = ({ cities, value, onChange, onSearch, onLoadMore }: Props) => {
  const [open, setOpen] = React.useState(false);

  const selectedCity = cities.find((city) => city.name === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between", !value && "text-muted-foreground")}
          >
            {selectedCity?.name || "Select city"}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command>
          <CommandInput
            placeholder="Search city..."
            onBlur={(event) => {
              onSearch?.(event.target.value);
            }}
          />
          <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              {cities
                .filter(({ name }) => name)
                .map(({ name }) => (
                  <CommandItem
                    key={name}
                    value={name}
                    onSelect={() => {
                      onChange(name);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn("mr-2 h-4 w-4", value === name ? "opacity-100" : "opacity-0")}
                    />
                    {name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
