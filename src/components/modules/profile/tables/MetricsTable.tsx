import React from "react";
import { User } from "@/types";
import { MetricItem } from "./MetricItem";

type Props = {
  user: User;
};

export const MetricsTable = ({ user }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {user?.metrics?.map((metric) => (
        <MetricItem key={metric.name} metric={metric} />
      ))}
    </div>
  );
};
