"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n";
import { PLACEHOLDERS } from "@/config";

type Props = {
  tags: string[];
};

export const TagsSection = ({ tags }: Props) => {
  const t = useTranslations("Modules");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <Tag />
        <div className="font-semibold">{t(PLACEHOLDERS.SECTION_TAGS)}</div>
      </div>
      <div className="flex flex-wrap gap-1">
        {tags?.map((tag) => (
          <Link key={tag} href={`?tags=${tag}`}>
            <Badge className="bg-badge-tertiary hover:bg-badge-tertiary-hover" variant="tertiary">
              <Tag /> {tag}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};
