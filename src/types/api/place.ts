import { APIPoint } from "./geo";
import { APISecurityLevel } from "@/types";
import { APIPreservationLevel } from "@/types";
import { APIMapBounds } from "@/types/api/map";

export type APIPlace = {
  id: number;
  name: string;
  description?: string;
  point: APIPoint;
  built_at?: string;
  abandoned_at?: string;
  created_at?: string;
  tags?: string[];
  security?: APISecurityLevel;
  preservation?: APIPreservationLevel;
};

export type APICreatePlace = {
  name: string;
  point: APIPoint;
  tags?: string[];
  is_private?: boolean;
};

export type APIPlaceFilters = APIMapBounds & {
  name?: string;
  area?: number;
  tags?: string;
  query?: string;
};
