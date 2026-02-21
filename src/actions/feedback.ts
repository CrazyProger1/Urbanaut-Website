"use server";

import { APICreateFeedback } from "@/types";
import * as services from "@/services";
import { convertAPIResponseToActionResult } from "@/utils/actions";

export const leaveFeedback = async (feedback: APICreateFeedback) => {
  const response = await services.createFeedback(feedback);
  return convertAPIResponseToActionResult(response);
};

