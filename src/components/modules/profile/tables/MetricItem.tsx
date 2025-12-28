import React from "react";
import { APIRetrieveMetric } from "@/types";

type Props = {
  metric: APIRetrieveMetric;
};

export const MetricItem = ({ metric }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-medium">{metric.value}</div>
      <div className="text-muted-foreground text-sm font-medium">{metric.name}</div>
    </div>
  );
};
