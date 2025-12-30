"use server";
import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import { ErrorAPIResponse, PaginatedAPIResponse, APIListReferralCode } from "@/types";

export const getReferralCodes = async (): Promise<
  PaginatedAPIResponse<APIListReferralCode> | ErrorAPIResponse
> => {
  return fetchAuthenticated(API_ENDPOINTS.REFERRAL_CODES);
};
