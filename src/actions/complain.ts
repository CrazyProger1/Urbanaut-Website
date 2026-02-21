"use server";

import * as services from "@/services";
import { convertAPIResponseToActionResult } from "@/utils/actions";

export const leaveComplaint = async (content: string, path: string) => {
  const response = await services.createRequest({
    context: { content },
    type: "COMPLAINT",
    path: path,
  });
  return convertAPIResponseToActionResult(response);
};
