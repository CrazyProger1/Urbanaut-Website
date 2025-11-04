"use client";

import { APICreateArea } from "@/types";
import { API_ENDPOINTS } from "@/config";
import { fetchAuthenticated } from "@/services";

export const createArea = async (area: APICreateArea) => {
  await fetchAuthenticated(API_ENDPOINTS.AREAS, {
    body: JSON.stringify(area),
    method: "POST",
  });
};
