"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { Link } from "@/i18n";
import { PAGES, QUERIES } from "@/config";

type Props = {
  tag: string;
};

export const TagBar = ({ tag }: Props) => {
  return (
    <Button variant="ghost" className="hover:bg-accent transition-colors" asChild>
      <Link
        href={`${PAGES.MAP}?${QUERIES.FILTER_TAGS}=${tag}`}
        className="text-foreground flex h-9 items-center gap-1.5 rounded-md px-1.5 text-sm font-medium select-none"
      >
        <Tag className="text-primary h-4 w-4" />
        <span>{tag}</span>
      </Link>
    </Button>
  );
};
