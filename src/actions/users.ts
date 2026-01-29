"use server";

import { APIUpdateSettings, APIUpdateUser } from "@/types";
import * as services from "@/services";
import { Locale } from "@/i18n";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/config";
import { syncCurrentUser } from "@/actions/auth";

export const updateUser = async (user: APIUpdateUser) => {
  return await services.updateUser(user);
};

export const updateCurrentUser = async (user: APIUpdateUser) => {
  revalidateTag(CACHE_TAGS.CURRENT_USER);
  await services.updateUser(user);
  await syncCurrentUser();
};

export const setLanguage = async (language: Locale) => {
  revalidateTag(CACHE_TAGS.CURRENT_USER);
  return await services.updateSettings({ language: language });
};

export const switchPushNotifications = async (enabled: boolean) => {
  revalidateTag(CACHE_TAGS.CURRENT_USER);
  return await services.updateSettings({ is_notifications_enabled: enabled });
};

export const switchEmailNews = async (enabled: boolean) => {
  revalidateTag(CACHE_TAGS.CURRENT_USER);
  return await services.updateSettings({ is_emails_enabled: enabled });
};

export const updateSettings = async (settings: APIUpdateSettings) => {
  await services.updateSettings(settings);
  revalidateTag(CACHE_TAGS.CURRENT_USER);
  await syncCurrentUser();
};
