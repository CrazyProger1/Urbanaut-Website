"use server";

import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import { APICreateTeam, APIListTeam, APIPaginatedResponse, APIRetrieveTeam } from "@/types";

export const createTeam = async (team: APICreateTeam) => {
  return await fetchAuthenticated(API_ENDPOINTS.TEAMS, {
    method: "POST",
    body: JSON.stringify(team),
  });
};

export const getTeams = async () => {
  return await fetchAuthenticated<APIPaginatedResponse<APIListTeam>>(API_ENDPOINTS.TEAMS);
};

export const getTeam = async (id: string) => {
  return await fetchAuthenticated<APIRetrieveTeam>(
    API_ENDPOINTS.TEAM.replace("[id]", id),
  );
};
