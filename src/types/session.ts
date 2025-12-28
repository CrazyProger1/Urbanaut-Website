import { APICurrentUser } from "@/types/api";

export type SessionUser = APICurrentUser;

export type Session = {
  accessToken?: string;
  refreshToken?: string;
  user?: SessionUser;
};
