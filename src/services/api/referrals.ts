"use server";
import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import { APIErrorResponse, APIPaginatedResponse, APIListReferralCode } from "@/types";

export const getReferralCodes = async (): Promise<
  APIPaginatedResponse<APIListReferralCode> | APIErrorResponse
> => {
  return fetchAuthenticated(API_ENDPOINTS.REFERRAL_CODES);
};
