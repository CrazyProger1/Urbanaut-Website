"use server";

import { headers } from "next/headers";

import { API_URL } from "@/config";
import { APIResponse, APIErrorResponse } from "@/types";

export type FetchAPIOptions = {
  accessToken?: string;
};

export const fetchAPI = async <T>(
  endpoint: string,
  options?: RequestInit & FetchAPIOptions,
): Promise<APIResponse & T> => {
  options = options || {};

  const { accessToken } = options;
  const actualFetchOptions = { ...options, accessToken: undefined };

  const nextHeaders = await headers();
  const clientIp =
    nextHeaders.get("x-forwarded-for")?.split(",").shift()?.trim() ||
    nextHeaders.get("x-real-ip") ||
    "unknown";
  const referer = nextHeaders.get("referer");
  const userAgent = nextHeaders.get("user-agent");
  const acceptLanguage = nextHeaders.get("accept-language");
  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    "Accept-Language": "en",
    "X-Forwarded-For": clientIp,
    "X-Client-Referer": referer ?? "",
    "X-Client-User-Agent": userAgent ?? "",
    "X-Client-Accept-Language": acceptLanguage ?? "",
    ...(actualFetchOptions.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...actualFetchOptions,
      headers: requestHeaders,
    });
    console.log("API Response Status:", response.status);
    const data = await response.json();
    console.log(`API ${endpoint} Response:`, data);
    return { success: response.ok, ...data };
  } catch (error) {
    console.error(error);
    return { success: false } as APIErrorResponse & T;
  }
};
