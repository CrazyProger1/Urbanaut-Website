import React from "react";
import { fetchAPI } from "@/services";
import { APIPlace, ErrorAPIResponse, PaginatedAPIResponse } from "@/types";
import { API_ENDPOINTS } from "@/config";
import { Map } from "@/components/modules/map";
import { APIArea } from "@/types/api";

const Page = async () => {
  const placesResponse = await fetchAPI<PaginatedAPIResponse<APIPlace> | ErrorAPIResponse>(
    API_ENDPOINTS.PLACES,
  );

  const areasResponse = await fetchAPI<PaginatedAPIResponse<APIArea> | ErrorAPIResponse>(
    API_ENDPOINTS.AREAS,
  );

  const places = placesResponse.success ? placesResponse.results : [];
  const areas = areasResponse.success ? areasResponse.results : [];

  return (
    <div className="flex h-full w-full">
      <Map places={places} areas={areas} />
    </div>
  );
};

export default Page;
