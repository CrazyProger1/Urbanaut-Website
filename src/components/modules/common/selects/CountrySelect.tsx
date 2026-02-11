"use client";

import React from "react";
import { useTranslations } from "next-intl";
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
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Country } from "@/types";
import { PLACEHOLDERS } from "@/config";

type Props = {
  countries: Country[];
  value?: string;
  onChange: (value: string) => void;
};

export const CountrySelect = ({ countries, value, onChange }: Props) => {
  const t = useTranslations("Modules");
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
            {selectedCountry?.name || t(PLACEHOLDERS.LABEL_SELECT_COUNTRY)}
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
          <CommandInput placeholder={t(PLACEHOLDERS.LABEL_SEARCH_COUNTRY)} />
          <CommandList>
            <CommandEmpty>{t(PLACEHOLDERS.LABEL_NO_COUNTRY_FOUND)}</CommandEmpty>
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
