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
          <div className="flex flex-row items-center gap-1">
            <p>Built:</p> <Badge variant="tertiary">{localizeDate(builtAt)}</Badge>
          </div>
        )}
        {abandonedAt && (
          <div className="flex flex-row items-center gap-1">
            <p>Abandoned:</p> <Badge variant="tertiary">{localizeDate(abandonedAt)}</Badge>
          </div>
        )}
        {createdAt && (
          <div className="flex flex-row items-center gap-1">
            <p>Added:</p> <Badge variant="tertiary">{localizeDate(createdAt)}</Badge>
          </div>
        )}
      </div>
    </div>
  );
};
