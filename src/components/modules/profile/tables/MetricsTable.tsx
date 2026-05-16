"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { MetricItem } from "./MetricItem";
import { PLACEHOLDERS } from "@/config";
import { UserDetail } from "@/types";

type Props = {
  user: UserDetail;
};

export const MetricsTable = ({ user: _user }: Props) => {
  const t = useTranslations("Modules");

  return (
    <div className="flex flex-row flex-wrap gap-1">
      <MetricItem value={0} label={t(PLACEHOLDERS.LABEL_FRIENDS)} />
      <MetricItem value={0} label={t(PLACEHOLDERS.LABEL_TEAMS)} />
      <MetricItem value={0} label={t(PLACEHOLDERS.LABEL_REFERRALS)} />
    </div>
  );
};