import { APIPreservationLevel } from "@/types";

export type APIMapBounds = {
  point_sw?: number[];
  point_ne?: number[];
};

export type APIMapFilters = {
  name?: string;
  query?: string;
  area?: string;
  ai_query?: string;
  is_private?: string;
  is_supposed?: string;
  is_favorite?: string;
  has_security?: string;
  tags?: string[];
  preservation?: APIPreservationLevel;
};
