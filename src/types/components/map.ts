import { APIPlaceFilters, APIPreservationLevel } from "@/types/services/api";

export type MapLayer = {
  label: string;
  value: string;
  primary?: boolean;
  url: string;
  attribution: string;
};

export type MapPageParams = APIPlaceFilters & {
  place: string;
  area: string;
  preservation: APIPreservationLevel;
};

