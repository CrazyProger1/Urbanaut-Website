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
  created_by?: string;
};