"use server";
import * as services from "@/services";
import { convertAPIResponseToActionResult } from "@/utils/actions";

export const uploadFile = async (file: File) => {
  const response = await services.uploadFile(file);
  return { ...response, errors: undefined, ...convertAPIResponseToActionResult(response) };
};
