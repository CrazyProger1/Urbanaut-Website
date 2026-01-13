import { APICurrentUser } from "@/types/services/api";

export type SessionUser = APICurrentUser;

export type Session = {
  accessToken?: string;
  refreshToken?: string;
  user?: SessionUser;
};
