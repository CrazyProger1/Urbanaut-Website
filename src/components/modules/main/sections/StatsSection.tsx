import React from "react";
import { Compass, Globe, MapPin, Users } from "lucide-react";
import { GlobalStats } from "@/types";
import { useTranslations } from "next-intl";

type StatItem = {
  icon: React.ElementType;
  labelKey: string;
  key: keyof GlobalStats;
};

const STATS: StatItem[] = [
  { icon: MapPin, labelKey: "LABEL_ABANDONED_OBJECTS", key: "places_count" },
  { icon: Users, labelKey: "LABEL_EXPLORERS", key: "users_count" },
  { icon: Globe, labelKey: "LABEL_COUNTRIES", key: "countries_count" },
  { icon: Compass, labelKey: "LABEL_EXPEDITIONS", key: "expeditions_count" },
];

type Props = {
  stats?: GlobalStats;
};

export const StatsSection = ({ stats }: Props) => {
  const t = useTranslations("Modules");
  return (
    <section className="bg-muted/20 border-b">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0">
        {STATS.map(({ icon: Icon, labelKey, key }) => (
          <div key={labelKey} className="flex flex-col items-center gap-1 px-6 py-8">
            <Icon className="text-muted-foreground mb-1 size-5" />
            <span className="text-3xl font-bold">{stats?.[key] ?? 0}</span>
            <span className="text-muted-foreground text-xs">{t(labelKey)}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
