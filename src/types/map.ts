import { APIPlaceFilters } from "@/types/api";

export type MapLayer = {
  label: string;
  value: string;
  primary?: boolean;
  url: string;
  attribution: string;
};

export type MapPageFilters = APIPlaceFilters & {
  place: string;
  area: string;
};
