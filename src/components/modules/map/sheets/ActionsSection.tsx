import React from "react";
import { Backpack, Play, Share2, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";

import { CopyToast } from "@/components/common/toasts";
import { Link } from "@/i18n";

type Props = {
  shareLink?: string;
  editLink?: string;
  planExpeditionLink?: string;
};

export const ActionsSection = ({ shareLink, editLink, planExpeditionLink }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <Play />
        <div className="font-semibold">Actions</div>
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
            <Button variant="outline">
              <Share2 />
            </Button>
          </CopyToast>
        )}
      </div>
    </div>
  );
};
