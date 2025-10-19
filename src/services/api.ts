"use server";

import { headers } from "next/headers";

import { API_URL } from "@/config";
import { APIResponse } from "@/types";

export type FetchAPIOptions = {
  expectedStatus?: number;
  token?: string;
};
export const fetchAPI = async <T>(
  endpoint: string,
  options: RequestInit & FetchAPIOptions = { expectedStatus: 200 },
): Promise<APIResponse & T> => {
  // eslint-disable-next-line prefer-const
  let { token, expectedStatus } = options;
  options = { ...options, expectedStatus: undefined, token: undefined };

  if (!expectedStatus) {
    expectedStatus = 200;
  }

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
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: requestHeaders,
    });
    const data = await response.json();
    console.log("Response:", data);
    return { success: response.status === expectedStatus, ...data };
  } catch (error) {
    console.error(error);
    return { success: false } as APIResponse & T;
  }
};
