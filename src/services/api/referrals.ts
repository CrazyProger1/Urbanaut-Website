"use server";
import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import {
  APIErrorResponse,
  APIPaginatedResponse,
  APIListReferralCode,
  APIListReferral,
  APIReferralsFilters,
} from "@/types";
import { buildURLSearchParams } from "@/utils/api";

export const getReferralCodes = async (): Promise<
  APIPaginatedResponse<APIListReferralCode> | APIErrorResponse
> => {
  return fetchAuthenticated(API_ENDPOINTS.REFERRAL_CODES);
};

type GetUserReferralsOptions = APIReferralsFilters;

export const getReferrerReferrals = async (
  options: GetUserReferralsOptions,
): Promise<APIPaginatedResponse<APIListReferral> | APIErrorResponse> => {
  const params = buildURLSearchParams<APIReferralsFilters>(options, [
    "referrer",
    "limit",
    "offset",
  ]);
  return fetchAuthenticated(`${API_ENDPOINTS.REFERRALS}?${params}`);
};
