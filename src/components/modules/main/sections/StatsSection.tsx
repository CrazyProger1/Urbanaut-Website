import React from "react";
import { Compass, Globe, MapPin, Users } from "lucide-react";
import { GlobalStats } from "@/types";

const STATS: { icon: React.ElementType; label: string; key: keyof GlobalStats }[] = [
  { icon: MapPin, label: "Abandoned Objects", key: "places_count" },
  { icon: Users, label: "Explorers", key: "users_count" },
  { icon: Globe, label: "Countries", key: "countries_count" },
  { icon: Compass, label: "Expeditions", key: "expeditions_count" },
];

type Props = {
  stats?: GlobalStats;
};

export const StatsSection = ({ stats }: Props) => {
  return (
    <section className="bg-muted/20 border-b">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0">
        {STATS.map(({ icon: Icon, label, key }) => (
          <div key={label} className="flex flex-col items-center gap-1 px-6 py-8">
            <Icon className="text-muted-foreground mb-1 size-5" />
            <span className="text-3xl font-bold">{stats?.[key] ?? 0}</span>
            <span className="text-muted-foreground text-xs">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
