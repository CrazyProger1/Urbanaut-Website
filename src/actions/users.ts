"use server";

import { APIUpdateSettings, APIUpdateUser } from "@/types";
import * as services from "@/services";
import { Locale } from "@/i18n";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/config";
import { syncCurrentUser } from "@/actions/auth";
import { convertAPIResponseToActionResult } from "@/utils/actions";

export const updateUser = async (user: APIUpdateUser) => {
  return await services.updateUser(user);
};

export const updateCurrentUser = async (user: APIUpdateUser) => {
  const response = await services.updateUser(user);
  const result = convertAPIResponseToActionResult(response);

  if (result.success) {
    revalidateTag(CACHE_TAGS.CURRENT_USER, "max");
    await syncCurrentUser();
  }
  return result;
};

export const updateSettings = async (settings: APIUpdateSettings) => {
  const response = await services.updateSettings(settings);

  const result = convertAPIResponseToActionResult(response);

  if (result.success) {
    revalidateTag(CACHE_TAGS.CURRENT_USER, "max");
    await syncCurrentUser();
  }

  return result;
};
