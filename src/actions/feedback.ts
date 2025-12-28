"use server";

import { APICreateFeedback } from "@/types";
import * as services from "@/services";

export const createFeedback = async (feedback: APICreateFeedback) => {
  return await services.createFeedback(feedback);
};
