"use server";

import { APIUpdateUser } from "@/types";
import * as services from "@/services";
import { Locale } from "@/i18n";

export const updateUser = async (user: APIUpdateUser) => {
  return await services.updateUser(user);
};

export const setLanguage = async (language: Locale) => {
  return await services.updateSettings({ language: language });
};

export const switchPushNotifications = async (enabled: boolean) => {
  return await services.updateSettings({ is_notifications_enabled: enabled });
};

export const switchEmailNews = async (enabled: boolean) => {};
