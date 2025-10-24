import React from "react";
import { APIMetric } from "@/types/api";

type Props = {
  metric: APIMetric;
};

export const MetricItem = ({ metric }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-medium">{metric.value}</div>
      <div className="text-muted-foreground text-sm font-medium">{metric.name}</div>
    </div>
  );
};
