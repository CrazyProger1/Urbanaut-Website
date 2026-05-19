import { APIListUser, APIOrderingParams, APIPaginationParams } from "@/types";

export type APITeamMember = {
  user: APIListUser;
  team: number;
  id: number;
};

export type APICreateTeam = {
  name: string;
  description?: string;
  motto?: string;
};

export type APIListTeam = {
  id: string;
  name: string;
  motto?: string;
  members_count?: number;
};

export type APIRetrieveTeam = {
  id: string;
  name: string;
  description?: string;
  motto?: string;
  members: APITeamMember[];
  created_by?: string;
  created_at: string;
};

export type APITeamFilters = { is_member?: boolean; query?: string } & APIOrderingParams &
  APIPaginationParams;

export type APITeamMemberFilters = { team?: string | number; query?: string } & APIOrderingParams &
  APIPaginationParams;
