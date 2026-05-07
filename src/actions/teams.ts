"use server";

import * as services from "@/services";
import { APICreateTeam } from "@/types";
import { convertAPIResponseToActionResult } from "@/utils/actions";

export const createTeam = async (team: APICreateTeam) => {
  const response = await services.createTeam(team);
  return convertAPIResponseToActionResult(response);
};