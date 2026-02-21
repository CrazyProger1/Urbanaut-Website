import React from "react";
import { getTags, getPlace, getArea, getCities, getCountries } from "@/services";
import { Map } from "@/components/modules/map";
import {
  AddPlaceModal,
  AddAreaModal,
  SuggestCorrectionModal,
  FiltersModal,
  EditPlaceModal,
} from "@/components/modules/map/modals";
import { AreaSheet, PlaceSheet } from "@/components/modules/map/sheets";
import { MapPageParams } from "@/types/components/map";
import { getSession } from "@/utils/session";

type Props = {
  searchParams: Promise<MapPageParams>;
};

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const tagsResponse = await getTags();
  const tags = tagsResponse.success ? tagsResponse.results : [];
  const session = await getSession();

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
  const countriesResponse = await getCountries();
  const countries = countriesResponse.success ? countriesResponse.results : [];

  const citiesResponse = await getCities();
  const cities = citiesResponse.success ? citiesResponse.results : [];

  const loadMoreCities = async () => {
    "use server";
    console.log("LOADING MORE CITIES");
  };

  const searchCity = async (term: string) => {
    "use server";
    console.log("SEARCHING CITIES");
  };

  return (
    <div className="flex h-full w-full">
      <Map user={session?.user} filters={params} />
      <AddPlaceModal tags={tags} />
      <AddAreaModal tags={tags} />
      <SuggestCorrectionModal />
      {currentPlace && <EditPlaceModal place={currentPlace} tags={tags} user={session?.user} />}
      <FiltersModal
        tags={tags}
        countries={countries}
        cities={cities}
        onLoadMoreCitiesAction={loadMoreCities}
        onSearchCityAction={searchCity}
      />
      {currentPlace && <PlaceSheet place={currentPlace} />}
      {currentArea && <AreaSheet area={currentArea} />}
    </div>
  );
};

export default Page;
