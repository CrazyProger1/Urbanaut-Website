import React from "react";
import { Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {};

export const StateSection = ({}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <Flame />
        <div className="font-semibold">State</div>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <div>
          Security:{" "}
          <Badge className="bg-security-hard border-security-hard">Private Security Agency</Badge>
        </div>
        <div>
          Difficulty:{" "}
          <Badge className="bg-difficulty-impossible border-difficulty-impossible">
            Impossible
          </Badge>
        </div>
        <div>
          Preservation:{" "}
          <Badge className="bg-preservation-medium border-preservation-medium">Medium</Badge>
        </div>
      </div>
    </div>
  );
};
