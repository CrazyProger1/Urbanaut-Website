import React from "react";
import { User } from "@/types";
import { MetricItem } from "./MetricItem";
import { Card } from "@/components/ui/card";

type Props = {
  user: User;
};

export const MetricsTable = ({ user }: Props) => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-4">
      {user?.metrics?.map((metric) => (
        <MetricItem key={metric.name} metric={metric} />
      ))}
    </div>
  );
};
