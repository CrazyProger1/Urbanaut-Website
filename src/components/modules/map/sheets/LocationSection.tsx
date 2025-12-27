import React from "react";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { APIPoint } from "@/types";
import { CopyToast } from "@/components/common/toasts";

type Props = {
  point?: APIPoint;
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
        <div className="flex flex-row gap-1 text-sm items-center">
          {point && (
            <div>
              Coordinates:{" "}
              <CopyToast clipboard={`${point[0]}, ${point[1]}`}>
                <Badge variant="tertiary">{`${point[0].toFixed(8)}, ${point[1].toFixed(8)}`}</Badge>
              </CopyToast>
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
