import { Telescope, Map, Earth, Binoculars } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import { PLACEHOLDERS } from "@/config";
import { Link } from "@/i18n";
import { SidebarButton } from "@/components/common/buttons";

import { APIPoint } from "@/types";

type Props = {
  point: APIPoint;
};

export const ExploreSection = ({ point }: Props) => {
  const t = useTranslations("Modules");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <Telescope />
        <div className="font-semibold">{t(PLACEHOLDERS.SECTION_EXPLORE)}</div>
      </div>
      <div className="flex flex-col gap-2">
        <SidebarButton asChild>
          <Link href={`https://www.google.com/maps?q=${point.join(",")}`} target="_blank">
            <Map size={16} /> Google Maps
          </Link>
        </SidebarButton>
        <SidebarButton asChild>
          <Link href={`https://earth.google.com/web/@${point.join(",")}`} target="_blank">
            <Earth size={16} /> Google Earth
          </Link>
        </SidebarButton>
        <SidebarButton asChild>
          <Link
            href={`https://www.openstreetmap.org/?mlat=${point[0]}&mlon=${point[1]}&zoom=17`}
            target="_blank"
          >
            <Map size={16} /> Open Street Map
          </Link>
        </SidebarButton>
        <SidebarButton asChild>
          <Link
            href={`https://wikimapia.org/#lat=${point[0]}&lon=${point[1]}&z=17`}
            target="_blank"
          >
            <Map size={16} /> Wikimapia
          </Link>
        </SidebarButton>
        {/*<SidebarButton asChild>*/}
        {/*  <Link href="#">*/}
        {/*    <Binoculars size={16} />*/}
        {/*    <span>Google Street View</span>*/}
        {/*  </Link>*/}
        {/*</SidebarButton>*/}
      </div>
    </div>
  );
};
