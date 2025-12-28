import { APIPoint } from "@/types";
import { APIMapBounds } from "@/types/api/map";

export type APIListArea = {
  id: number;
  polygon: APIPoint[];
};

export type APIRetrieveArea = {
  id: number;
  name: string;
  name_en?: string;
  description?: string;
  description_en?: string;
  polygon: APIPoint[];
  tags: string[];
  security: string;
  is_private: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
  parent?: number;
};

export type APICreateArea = {
  name: string;
  description?: string;
  polygon: APIPoint[];
  parent?: number;
  tags: string[];
  is_private?: boolean;
};

export type APIAreaFilters = APIMapBounds & {
  tags?: string;
  query?: string;
};
