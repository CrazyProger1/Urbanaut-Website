import { APIPoint } from "@/types";
import { APIMapBounds } from "@/types/api/map";

export type APIArea = {
  id: number;
  name: string;
  description?: string;
  polygon: APIPoint[];
  tags?: string[];
};

export type APICreateArea = {
  name: string;
  polygon: APIPoint[];
  tags?: string[];
};

export type APIAreaFilters = APIMapBounds & {
  tags?: string;
  query?: string;
};
