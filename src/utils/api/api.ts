import { APIErrorResponse, APISuccessfulResponse } from "@/types";

export const requireRefresh = (response: APIErrorResponse | APISuccessfulResponse): boolean => {
  return !response.success && response?.errors?.[0]?.code === "token_not_valid";
};

export const buildURLSearchParams = <T>(
  params?: Record<string, string | number | string[] | number[] | undefined | null>,
  keys?: (keyof T)[],
) => {
  let searchParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (keys && !key.includes(key)) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(key, String(item));
      });
    } else {
      searchParams.set(key, String(value));
    }
  });
  return searchParams;
};

