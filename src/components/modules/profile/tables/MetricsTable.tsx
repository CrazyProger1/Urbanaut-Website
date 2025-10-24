import React from "react";
import { APIUser } from "@/types";
import { MetricItem } from "./MetricItem";

type Props = {
  user: APIUser;
};

export const MetricsTable = ({ user }: Props) => {
  return (
    <div className="flex flex-row gap-4">
      {user?.metrics?.map((metric) => (
        <MetricItem key={metric.name} metric={metric} />
      ))}
    </div>
  );
};
