import { ErrorAPIResponse, SuccessfulAPIResponse } from "@/types";

export const requireRefresh = (response: ErrorAPIResponse | SuccessfulAPIResponse): boolean => {
  return !response.success && response?.errors?.[0]?.code === "token_not_valid";
};
