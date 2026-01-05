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
import { APIListCountry } from "@/types/api";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  countries: APIListCountry[];
  value: string;
  onChange: (value: string) => void;
};

export const CountrySelect = ({ countries, value, onChange }: Props) => {
  const [open, setOpen] = React.useState(false);

  const selectedCountry = countries.find((country) => country.tld === value);

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
            {selectedCountry?.name || "Select country"}
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
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries
                .filter(({ name, tld }) => name && tld)
                .map(({ name, tld }) => (
                  <CommandItem
                    key={tld + name}
                    value={name}
                    onSelect={() => {
                      onChange(tld);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn("mr-2 h-4 w-4", value === tld ? "opacity-100" : "opacity-0")}
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
