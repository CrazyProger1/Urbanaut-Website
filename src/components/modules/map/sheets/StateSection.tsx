import React from "react";
import { Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { APIPreservationLevel, APISecurityLevel } from "@/types";
import { getPreservationColorClass, getSecurityColorClass } from "@/utils/css";
import { Link } from "@/i18n";

type Props = {
  security?: APISecurityLevel;
  preservation?: APIPreservationLevel;
};

export const StateSection = ({ security, preservation }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <Flame />
        <div className="font-semibold">State</div>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <div>
          Security:{" "}
          <Link href={`?security=${security}`}>
            <Badge className={getSecurityColorClass(security)}>{security}</Badge>
          </Link>
        </div>
        {/*<div>*/}
        {/*  Difficulty:{" "}*/}
        {/*  <Badge className="bg-difficulty-impossible border-difficulty-impossible">*/}
        {/*    Impossible*/}
        {/*  </Badge>*/}
        {/*</div>*/}
        <div>
          Preservation:{" "}
          <Link href={`?preservation=${preservation}`}>
            <Badge className={`${getPreservationColorClass(preservation)} cursor-pointer`}>
              {preservation}
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};
