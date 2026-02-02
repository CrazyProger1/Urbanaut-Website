"use server";

import { ActionResult, APICreateFeedback } from "@/types";
import * as services from "@/services";
import { convertAPIResponseToActionResult } from "@/utils/actions";

export const createFeedback = async (feedback: APICreateFeedback) => {
  const response = await services.createFeedback(feedback);
  return convertAPIResponseToActionResult(response);
};
