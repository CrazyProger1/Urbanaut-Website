export type APICreateTeam = {
  name: string;
  description?: string;
  motto?: string;
};

export type APIRetrieveTeam = {
  id: string;
  name: string;
  description?: string;
  motto?: string;
  created_by?: string;
};