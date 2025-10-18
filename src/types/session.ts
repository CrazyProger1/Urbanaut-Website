import { APIMeUser } from "@/types/api";

export type SessionUser = APIMeUser;

export type Session = {
  accessToken?: string;
  refreshToken?: string;
  user?: SessionUser;
};
