import React from "react";
import { Hourglass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { localizeDate } from "@/utils/date";

type Props = {
  builtAt?: Date;
  abandonedAt?: Date;
  createdAt?: Date;
};

export const TimelineSection = ({ builtAt, abandonedAt, createdAt }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <Hourglass />
        <div className="font-semibold">Timeline</div>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        {builtAt && (
          <div>
            Built: <Badge variant="outline">{localizeDate(builtAt)}</Badge>
          </div>
        )}
        {abandonedAt && (
          <div>
            Abandoned: <Badge variant="outline">{localizeDate(abandonedAt)}</Badge>
          </div>
        )}
        {createdAt && (
          <div>
            Added: <Badge variant="outline">{localizeDate(createdAt)}</Badge>
          </div>
        )}
      </div>
    </div>
  );
};
