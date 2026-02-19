import { APIPoint } from "./geo";
import { APISecurityLevel } from "@/types";
import { APIPreservationLevel } from "@/types";
import { APIMapBounds } from "@/types/services/api/map";
import { APIListUser } from "@/types/services/api/user";
import { APIListFile } from "@/types/services/api/media";

export type APIListPlaceFile = APIListFile;

export type APIListPlace = {
  id: number;
  point: APIPoint;
  is_favorite: boolean;
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
  is_favorite: boolean;
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
  is_supposed?: boolean;
  preservation?: APIPlaceCreatePreservation;
  security?: APISecurityLevel;
  files?: string[];
};

export type APIPlaceFilters = APIMapBounds & {
  name?: string;
  area?: number;
  tags?: string;
  query?: string;
};

export type APIPlaceCreatePreservation = {
  has_windows?: boolean;
  has_roof?: boolean;
  has_floor?: boolean;
  has_walls?: boolean;
  has_doors?: boolean;
  has_internal_ceilings?: boolean;
};
