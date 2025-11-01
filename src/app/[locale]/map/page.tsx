import React from "react";
import { getPlaces, getTags, getAreas, getPlace } from "@/services";
import { Map } from "@/components/modules/map";
import { AddPlaceModal, AddAreaModal } from "@/components/modules/map/modals";
import { PlaceSheet } from "@/components/modules/map/sheets";

type Props = {
  searchParams: Promise<{ place: string }>;
};

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const tagsResponse = await getTags();
  const placesResponse = await getPlaces();
  const areasResponse = await getAreas();

  const places = placesResponse.success ? placesResponse.results : [];
  const areas = areasResponse.success ? areasResponse.results : [];
  const tags = tagsResponse.success ? tagsResponse.results : [];

  let currentPlace;

  if (params.place) {
    const placeResponse = await getPlace(params.place);

    if (placeResponse.success) {
      currentPlace = placeResponse;
    }
  }
  return (
    <div className="flex h-full w-full">
      <Map places={places} areas={areas} />
      <AddPlaceModal tags={tags} />
      <AddAreaModal tags={tags} />
      {currentPlace && <PlaceSheet place={currentPlace} />}
    </div>
  );
};

export default Page;
