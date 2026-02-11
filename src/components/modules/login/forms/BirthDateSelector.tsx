"use client";

import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { PLACEHOLDERS } from "@/config";

type Props = {
  value?: Date;
  onChange?: (value: Date) => void;
};
export const BirthDateSelector = ({ value, onChange }: Props) => {
  const t = useTranslations("Modules");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(value);

  useEffect(() => {
    if (date) {
      onChange?.(date);
    }
  }, [date, onChange]);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="date" className="px-1">
        {t(PLACEHOLDERS.LABEL_BIRTH_DATE)}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="w-full justify-between font-normal">
            {date ? date.toISOString().split('T')[0] : t(PLACEHOLDERS.LABEL_SELECT_DATE)}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
