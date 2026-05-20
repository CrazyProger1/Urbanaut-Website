"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { MetricItem } from "./MetricItem";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { UserDetail } from "@/types";
import { TABS } from "@/config/nav";

type Props = {
  user: UserDetail;
};

export const MetricsTable = ({ user }: Props) => {
  const t = useTranslations("Modules");

  const get = (key: string) => user.metrics.find((m) => m.key === key)?.value ?? 0;

  return (
    <div className="flex flex-row flex-wrap gap-1">
      <MetricItem
        href={`?${QUERIES.PROFILE_TAB}=${TABS.PROFILE_FRIENDS}`}
        value={get("friends")}
        label={t(PLACEHOLDERS.LABEL_FRIENDS)}
      />
      <MetricItem
        href={`?${QUERIES.PROFILE_TAB}=${TABS.PROFILE_TEAMS}`}
        value={get("teams")}
        label={t(PLACEHOLDERS.LABEL_TEAMS)}
      />
      <MetricItem value={get("referrals")} label={t(PLACEHOLDERS.LABEL_REFERRALS)} />
    </div>
  );
};
