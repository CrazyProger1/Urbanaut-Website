import React, { useMemo } from "react";
import { APIPlace } from "@/types";
import { Marker } from "react-leaflet";
import { LatLng } from "leaflet";
import { useMapBounds } from "@/components/modules/map/hooks";
import { useRouter } from "@/i18n";

type Props = {
  places?: APIPlace[];
};

export const PlacesLayer = ({ places }: Props) => {
  const mapBounds = useMapBounds();
  const router = useRouter();

  const visiblePlaces: APIPlace[] = useMemo(() => {
    if (!places || !mapBounds) return [];
    return places.filter((place) => mapBounds.contains(new LatLng(place.point[0], place.point[1])));
  }, [places, mapBounds]);

  return (
    visiblePlaces &&
    visiblePlaces.map((place) => (
      <Marker
        key={place.id}
        position={[place.point[0], place.point[1]]}
        eventHandlers={{
          click: () => {
            router.push(`/map?place=${place.id}`, { scroll: false });
          },
        }}
      />
    ))
  );
};
