"use server";

import { headers } from "next/headers";

import { API_URL } from "@/config";
import { SuccessfulAPIResponse, ErrorAPIResponse } from "@/types";
import { getSession } from "@/utils/session";

export type FetchAPIOptions = {
  expectedStatus?: number;
};

export const fetchAPI = async <T>(
  endpoint: string,
  options: RequestInit & FetchAPIOptions = { expectedStatus: 200 },
): Promise<(SuccessfulAPIResponse | ErrorAPIResponse) & T> => {
  // eslint-disable-next-line prefer-const
  let { expectedStatus } = options;
  const actualFetchOptions = { ...options, expectedStatus: undefined };

  const session = await getSession();

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
    ...(actualFetchOptions.headers || {}),
    ...(session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}),
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...actualFetchOptions,
      headers: requestHeaders,
    });
    const data = await response.json();
    console.log("Response:", data);
    return { success: response.status === expectedStatus, ...data };
  } catch (error) {
    console.error(error);
    return { success: false } as ErrorAPIResponse & T;
  }
};
