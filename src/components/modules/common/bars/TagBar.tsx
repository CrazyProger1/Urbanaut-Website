"use client";

import React from "react";
import { Tag } from "lucide-react";
import { Bar } from "./Bar";
import { PAGES, QUERIES } from "@/config";

type Props = {
  tag: string;
};

export const TagBar = ({ tag }: Props) => {
  return (
    <Bar
      icon={<Tag className="text-primary h-5 w-5" />}
      href={`${PAGES.MAP}?${QUERIES.FILTER_TAGS}=${tag}`}
    >
      {tag}
    </Bar>
  );
};