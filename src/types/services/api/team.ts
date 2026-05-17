import { APIListUser } from "@/types";

export type APITeamMember = APIListUser;

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

export type APITeamFilters = {
  ordering?: string;
};
