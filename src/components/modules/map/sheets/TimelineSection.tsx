import React from "react";
import { Hourglass } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {};

export const TimelineSection = ({}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <Hourglass />
        <div className="font-semibold">Timeline</div>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <div>
          Built: <Badge variant="outline">20 May 2025</Badge>
        </div>
        <div>
          Abandoned: <Badge variant="outline">1 July 2025</Badge>
        </div>
        <div>
          Added: <Badge variant="outline">30 Mart 2027</Badge>
        </div>
      </div>
    </div>
  );
};
