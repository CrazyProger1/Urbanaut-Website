import React from "react";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  point?: string;
  address?: string;
};

export const LocationSection = ({ point, address }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <MapPin />
        <div className="font-semibold">Location</div>
      </div>

      <div className="flex flex-col gap-1 text-sm">
        <div className="flex flex-row gap-1 text-sm">
          {point && (
            <div>
              Coordinates: <Badge variant="outline">{point}</Badge>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-1">
          {address && (
            <div>
              Address: <Badge variant="outline">{address}</Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
