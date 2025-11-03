import { ErrorAPIResponse, SuccessfulAPIResponse } from "@/types";

export const requireRefresh = (response: ErrorAPIResponse | SuccessfulAPIResponse): boolean => {
  return !response.success && response?.errors?.[0]?.code === "token_not_valid";
};

export const builtURLSearchParams = <T>(
  params?: Record<string, string | number | string[] | number[] | undefined | null>,
  keys?: (keyof T)[],
) => {
  let searchParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (keys && !key.includes(key)) {
      return;
    }
    searchParams.set(key, String(value));
  });
  return searchParams;
};
