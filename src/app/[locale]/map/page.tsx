import React from "react";
import { getPlaces, getTags, getAreas } from "@/services";
import { Map } from "@/components/modules/map";
import { AddPlaceModal, AddAreaModal } from "@/components/modules/map/modals";

const Page = async () => {
  const tagsResponse = await getTags();
  const placesResponse = await getPlaces();
  const areasResponse = await getAreas();

  const places = placesResponse.success ? placesResponse.results : [];
  const areas = areasResponse.success ? areasResponse.results : [];
  const tags = tagsResponse.success ? tagsResponse.results : [];

  return (
    <div className="flex h-full w-full">
      <Map places={places} areas={areas} />
      <AddPlaceModal tags={tags} />
      <AddAreaModal tags={tags} />
    </div>
  );
};

export default Page;
