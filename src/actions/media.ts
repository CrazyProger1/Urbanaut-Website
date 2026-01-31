"use server";
import * as services from "@/services";

export const uploadFile = async (file: File) => {
  return await services.uploadFile(file);
};
