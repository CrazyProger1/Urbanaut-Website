import React from "react";
import { LeafletMap } from "./LeafletMap";
import { fetchAPI } from "@/services";
import { APIPlace, ErrorAPIResponse, PaginatedAPIResponse } from "@/types";
import { API_ENDPOINTS } from "@/config";

const Page = async () => {

  const response = await fetchAPI<PaginatedAPIResponse<APIPlace> | ErrorAPIResponse>(
    API_ENDPOINTS.PLACES,
  );

  const places: APIPlace[] = response.success ? response.results : [];

  return (
    <div className="flex w-full h-full">
      <LeafletMap places={places}/>
    </div>
  );
};

export default Page;