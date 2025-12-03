"use server";

import { APICreateFeedback } from "@/types";
import * as services from "@/services";
import { API_ENDPOINTS } from "@/config";

export const createFeedback = async (place: APICreateFeedback) => {
  await services.fetchAuthenticated(API_ENDPOINTS.FEEDBACKS, {
    body: JSON.stringify(place),
    method: "POST",
  });
};
