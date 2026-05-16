"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { useFormatter } from "next-intl";
import { Bar } from "./Bar";

type Props = {
  date: Date;
  label?: string;
};

export const DateBar = ({ date, label }: Props) => {
  const formatter = useFormatter();
  const formattedDate = formatter.dateTime(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Bar icon={<Calendar className="text-primary h-5 w-5" />} tooltip={label}>
      {formattedDate}
    </Bar>
  );
};