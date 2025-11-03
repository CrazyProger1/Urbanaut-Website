import React from "react";
import { getPlaces, getTags, getAreas, getPlace, getArea } from "@/services";
import { Map } from "@/components/modules/map";
import { AddPlaceModal, AddAreaModal } from "@/components/modules/map/modals";
import { AreaSheet, PlaceSheet } from "@/components/modules/map/sheets";
import { MapPageFilters } from "@/types/map";

type Props = {
  searchParams: Promise<MapPageFilters>;
};

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const tagsResponse = await getTags();
  const placesResponse = await getPlaces(params);
  const areasResponse = await getAreas();

  const places = placesResponse.success ? placesResponse.results : [];
  const areas = areasResponse.success ? areasResponse.results : [];
  const tags = tagsResponse.success ? tagsResponse.results : [];

  let currentPlace;
  let currentArea;

  if (params.place) {
    const placeResponse = await getPlace(params.place);

    if (placeResponse.success) {
      currentPlace = placeResponse;
    }
  }

  if (params.area) {
    const areaResponse = await getArea(params.area);

    if (areaResponse.success) {
      currentArea = areaResponse;
    }
  }
  return (
    <div className="flex h-full w-full">
      <Map places={places} areas={areas} />
      <AddPlaceModal tags={tags} />
      <AddAreaModal tags={tags} />
      {currentPlace && <PlaceSheet place={currentPlace} />}
      {currentArea && <AreaSheet area={currentArea} />}
    </div>
  );
};

export default Page;
