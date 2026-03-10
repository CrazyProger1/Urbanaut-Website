import { Telescope, Map, Earth, Binoculars } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import { PLACEHOLDERS } from "@/config";
import { Link } from "@/i18n";
import { SidebarButton } from "@/components/common/buttons";

import { APIPoint } from "@/types";
import { useMapProviderLinks } from "@/hooks";
import { useMapStore } from "@/stores";

type Props = {
  point: APIPoint;
};

export const ExploreSection = ({ point }: Props) => {
  const t = useTranslations("Modules");
  const { currentMapZoom } = useMapStore();
  const providers = useMapProviderLinks(point, currentMapZoom);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <Telescope />
        <div className="font-semibold">{t(PLACEHOLDERS.SECTION_EXPLORE)}</div>
      </div>
      <div className="flex flex-col gap-2">
        {providers.map(({ type, name, link }) => (
          <SidebarButton asChild key={link}>
            <Link href={link} target="_blank">
              {type === "map" && <Map size={16} />}
              {type === "map3d" && <Earth size={16} />}
              {type === "streetview" && <Binoculars size={16} />}
              {name}
            </Link>
          </SidebarButton>
        ))}
      </div>
    </div>
  );
};
