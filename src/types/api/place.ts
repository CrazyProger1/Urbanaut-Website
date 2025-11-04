import { APIPoint } from "./geo";

export type APIPlace = {
  id: number;
  name: string;
  description?: string;
  point: APIPoint;
  built_at?: string;
  abandoned_at?: string;
  created_at?: string;
  tags?: string[];
};

export type APICreatePlace = {
  name: string;
  point: APIPoint;
};

export type APIPlaceFilters = {
  name?: string;
  area?: number;
  tags?: string;
};
