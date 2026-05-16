"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  PreservationBar,
  PrivateBar,
  SecurityBar,
  SupposedBar,
  TagBar,
} from "@/components/modules/common/bars";
import { PLACEHOLDERS } from "@/config";
import { PlacePreservation } from "@/types";

type Props = {
  tags: string[];
  isSupposed?: boolean;
  isPrivate?: boolean;
  hasSecurity?: boolean;
  preservation?: PlacePreservation;
};

export const TagsSection = ({
  tags,
  isSupposed,
  isPrivate,
  hasSecurity,
  preservation,
}: Props) => {
  const t = useTranslations("Modules");

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="font-semibold">{t(PLACEHOLDERS.SECTION_TAGS)}</div>
      <div className="flex flex-wrap gap-1">
        {preservation && <PreservationBar preservation={preservation} />}
        {isPrivate && <PrivateBar />}
        {isSupposed && <SupposedBar />}
        {hasSecurity && <SecurityBar />}
        {tags.map((tag) => (
          <TagBar key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
};
