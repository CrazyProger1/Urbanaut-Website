import { APIListUser, APIPaginationParams } from "@/types";

export type APIListReferralCode = {
  code: string;
};

export type APIListReferral = {
  code: string;
  user: APIListUser;
};

export type APIReferralsFilters = {
  referrer?: string;
} & APIPaginationParams;
