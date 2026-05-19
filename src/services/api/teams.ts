"use server";

import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import {
  APICreateTeam,
  APIListTeam,
  APIPaginatedResponse,
  APIRetrieveTeam,
  APITeamFilters,
  APITeamMember,
  APITeamMemberFilters,
} from "@/types";
import { buildURLSearchParams } from "@/utils/api";

type GetTeamsOptions = APITeamFilters;

export const createTeam = async (team: APICreateTeam) => {
  return await fetchAuthenticated(API_ENDPOINTS.TEAMS, {
    method: "POST",
    body: JSON.stringify(team),
  });
};

export const getTeams = async (options?: GetTeamsOptions) => {
  const params = buildURLSearchParams<APITeamFilters>(options, [
    "ordering",
    "offset",
    "limit",
    "is_member",
    "query",
  ]);
  return await fetchAuthenticated<APIPaginatedResponse<APIListTeam>>(
    `${API_ENDPOINTS.TEAMS}?${params}`,
  );
};

export const getTeam = async (id: string) => {
  return await fetchAuthenticated<APIRetrieveTeam>(API_ENDPOINTS.TEAM.replace("[id]", id));
};

type GetTeamMembersOptions = APITeamMemberFilters;

export const getTeamMembers = async (options?: GetTeamMembersOptions) => {
  const params = buildURLSearchParams(options, ["limit", "offset", "team", "ordering", "query"]);
  return await fetchAuthenticated<APIPaginatedResponse<APITeamMember>>(`${API_ENDPOINTS.MEMBERS}?${params}`);
};
