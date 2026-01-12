import { APIPoint } from "./geo";
import { APISecurityLevel } from "@/types";
import { APIPreservationLevel } from "@/types";
import { APIMapBounds } from "@/types/api/map";
import { APIListUser } from "@/types/api/user";
import { APIListFile } from "@/types/api/media";

export type APIListPlaceFile = APIListFile;

export type APIListPlace = {
  id: number;
  point: APIPoint;
};

export type APIRetrievePlace = {
  id: number;
  name: string;
  name_en?: string;
  description?: string;
  description_en?: string;
  point: APIPoint;
  tags: string[];
  security: APISecurityLevel;
  preservation: APIPreservationLevel;
  built_at?: string;
  abandoned_at?: string;
  is_private: boolean;
  created_at: string;
  updated_at: string;
  created_by?: APIListUser;
  photos: APIListPlaceFile[];
  area?: number;
};

export type APICreatePlace = {
  name: string;
  name_en?: string;
  description?: string;
  description_en?: string;
  point: APIPoint;
  tags: string[];
  built_at?: string;
  abandoned_at?: string;
  area?: number;
  is_private?: boolean;
  preservation?: APIPreservationLevel;
  security?: APISecurityLevel;
};

export type APIPlaceFilters = APIMapBounds & {
  name?: string;
  area?: number;
  tags?: string;
  query?: string;
};
