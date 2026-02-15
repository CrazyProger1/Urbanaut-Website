"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Backpack, Heart, Play, Share2, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";

import { CopyToast } from "@/components/common/toasts";
import { Link } from "@/i18n";
import { Tooltip } from "@/components/ui/next/tooltip";
import { PLACEHOLDERS } from "@/config";

type Props = {
  shareLink?: string;
  editLink?: string;
  planExpeditionLink?: string;
  isFavorite?: boolean;
  toggleFavoriteAction?: () => void;
};

export const ActionsSection = ({
  shareLink,
  editLink,
  planExpeditionLink,
  isFavorite,
  toggleFavoriteAction,
}: Props) => {
  const t = useTranslations("Modules");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <Play />
        <div className="font-semibold">{t(PLACEHOLDERS.SECTION_ACTIONS)}</div>
      </div>
      <div className="flex flex-row gap-1">
        {editLink && (
          <Button variant="outline" asChild>
            <Link href={editLink}>
              <SquarePen />
            </Link>
          </Button>
        )}
        {planExpeditionLink && (
          <Button variant="outline" asChild>
            <Link href={planExpeditionLink}>
              <Backpack />
            </Link>
          </Button>
        )}
        {shareLink && (
          <CopyToast clipboard={shareLink}>
            <Tooltip content={t(PLACEHOLDERS.TOOLTIP_SHARE_PLACE)} asChild>
              <Button variant="outline">
                <Share2 />
              </Button>
            </Tooltip>
          </CopyToast>
        )}
        <Tooltip
          content={t(
            isFavorite ? PLACEHOLDERS.TOOLTIP_UNMARK_FAVORITE : PLACEHOLDERS.TOOLTIP_MARK_FAVORITE,
          )}
          asChild
        >
          <Button variant="outline" onClick={toggleFavoriteAction}>
            <Heart fill={isFavorite ? "white" : undefined} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
