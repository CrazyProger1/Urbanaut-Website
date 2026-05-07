"use server";

import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import { APICreateTeam } from "@/types";

export const createTeam = async (team: APICreateTeam) => {
  return await fetchAuthenticated(API_ENDPOINTS.TEAMS, {
    method: "POST",
    body: JSON.stringify(team),
  });
};