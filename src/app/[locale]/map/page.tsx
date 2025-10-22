import React from "react";
import { fetchAuthenticated } from "@/services";
import { APIPlace, ErrorAPIResponse, PaginatedAPIResponse } from "@/types";
import { API_ENDPOINTS } from "@/config";
import { Map } from "@/components/modules/map";
import { APIArea } from "@/types/api";
import { AddPlaceModal } from "@/components/modules/map/modals";

const Page = async () => {
  const placesResponse = await fetchAuthenticated<
    PaginatedAPIResponse<APIPlace> | ErrorAPIResponse
  >(API_ENDPOINTS.PLACES);

  const areasResponse = await fetchAuthenticated<PaginatedAPIResponse<APIArea> | ErrorAPIResponse>(
    API_ENDPOINTS.AREAS,
  );

  const places = placesResponse.success ? placesResponse.results : [];
  const areas = areasResponse.success ? areasResponse.results : [];

  return (
    <div className="flex h-full w-full">
      <Map places={places} areas={areas} />
      <AddPlaceModal />
    </div>
  );
};

export default Page;
