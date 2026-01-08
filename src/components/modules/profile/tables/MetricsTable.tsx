import React from "react";
import { APICurrentUser, APIRetrieveUser } from "@/types";
import { MetricItem } from "./MetricItem";

type Props = {
  user: APIRetrieveUser;
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
